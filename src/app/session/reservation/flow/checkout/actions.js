"use server";

import { revalidatePath } from "next/cache";
import {
  putReservation,
  postReservation,
  postOrder,
  patchOrder,
  postGuests,
  deleteUnpaid,
  getOrderById,
} from "@/lib/order";
import { Processing } from "@/lib/utils";

export async function submitOrder(prev, formData) {
  // BOOKING FLOW || STEP ONE
  if (prev.step === 1) {
    const stepOne = await submitStepOne(prev, formData);
    revalidatePath("/");
    return { success: false, ...stepOne };
  }

  // BOOKING FLOW || STEP TWO
  if (prev.step === 2) {
    const stepTwo = await submitStepTwo(prev, formData);
    revalidatePath("/");
    return { success: false, ...stepTwo };
  }

  // BOOKING FLOW || STEP THREE
  if (prev.step === 3) {
    const stepThree = await submitStepThree(prev, formData);
    await deleteUnpaid();
    return { success: true, ...stepThree };
  }
}

// BOOKING FLOW || STEP ONE
export async function submitStepOne(prev, formData) {
  // COLLECT ORDER
  const partoutQuantity = Number(formData.get("partout"));
  const vipQuantity = Number(formData.get("vip"));

  const partoutTickets = Array(partoutQuantity).fill({
    keyName: "partoutName",
    keyEmail: "partoutEmail",
  });
  const vipTickets = Array(vipQuantity).fill({
    keyName: "vipName",
    keyEmail: "vipEmail",
    vip: true,
  });

  const tickets = { keys: [...partoutTickets, ...vipTickets] };

  // PREPARE RESERVATION
  const reservationData = {};
  const orderData = {};

  reservationData.area = formData.get("area");
  reservationData.amount = partoutQuantity + vipQuantity;

  orderData.camping_area = reservationData.area;
  orderData.green_fee = Boolean(formData.get("greenFee"));

  // FORM VALIDATION
  const errors = {};

  if (!reservationData.amount || reservationData.amount < 1) {
    errors.tooFewTickets = "Please select your tickets.";
  }

  if (partoutQuantity > 10 || vipQuantity > 10) {
    errors.tooManyTickets = "Please limit your selection to 10 tickets.";
  }

  if (errors.tooFewTickets || errors.tooManyTickets) {
    await Processing(1500);
    return { ...prev, success: false, errors, orderData };
  }

  // PUT RESERVATION
  const response = await putReservation(reservationData);

  if (response) {
    orderData.reservation_id = response.id;
    orderData.paid = false;

    await postOrder(orderData);
    await Processing(1000);

    return {
      step: 2,
      errors: {},
      orderData,
      tickets,
    };
  } else {
    return { errors: {} };
  }
}

// BOOKING FLOW || STEP TWO
export async function submitStepTwo(prev, formData) {
  const isGoingBack = Boolean(formData.get("isGoingBack"));

  // LINK GUESTS TO RESERVATION
  const reservationId = prev.orderData.reservation_id;
  // IS BUYER GUEST?
  const customerData = {};
  const isBuyer = Boolean(formData.get("isBuyer"));

  // COLLECT GUEST DATA
  let guests = [];

  const names = [
    ...formData.getAll("partoutName"),
    ...formData.getAll("vipName"),
  ];
  const emails = [
    ...formData.getAll("partoutEmail"),
    ...formData.getAll("vipEmail"),
  ];
  const vip = [
    ...Array(formData.getAll("partoutName").length).fill(false),
    ...Array(formData.getAll("vipName").length).fill(true),
  ];

  names.map((str, id) => {
    const guest = {};

    guest.reservation_id = reservationId;
    guest.name = str;
    guest.email = emails[id];
    guest.vip = vip[id];

    guests = [...guests, guest];

    if (isBuyer) {
      customerData.name = str;
      customerData.email = emails[id];
    }
  });

  const orderData = { ...prev.orderData, ...customerData };

  // COLLECT TENT ADDONS
  const tentSpaces = {};

  tentSpaces.double = formData.get("tentDouble") * 2;
  tentSpaces.triple = formData.get("tentTriple") * 3;
  tentSpaces.total = tentSpaces.double + tentSpaces.triple;

  orderData.optional_tent_setup = {
    tent_double: formData.get("tentDouble"),
    tent_triple: formData.get("tentTriple"),
  };

  // FORM VALIDATION
  const errors = {};

  if (!isGoingBack) {
    guests.map(({ name, email }) => {
      if (!name || name.length < 2) {
        errors.guests = {
          name: "Please provide the name of each guest.",
        };
      }

      if (isBuyer) {
        if (!name || name.length < 2) {
          errors.guests = {
            name: "Please provide your name and email.",
          };
        }
        if (!email || !email.includes("@") || !email.includes(".")) {
          errors.guests = {
            ...errors.guests,
            email: "Please provide your name and email.",
          };
        }
      }
    });

    if (guests.length > 1 && tentSpaces.total) {
      if (guests.length < tentSpaces.total) {
        errors.tentSetup = `Please fill up all available tent space. ${
          tentSpaces.total - guests.length
        } spaces left to fill.`;
      }
      if (guests.length > tentSpaces.total) {
        errors.tentSetup = `Please ensure room for all guests. Missing space for ${
          guests.length - tentSpaces.total
        } guests.`;
      }
    }
    if (guests.length === 1 && tentSpaces.total > 2) {
      errors.tentSetup = "You can only add one tent for a single guest.";
    }

    if (errors.guests || errors.tentSetup) {
      await Processing(1500);
      return {
        ...prev,
        success: false,
        errors,
        orderData,
        tickets: { ...prev.tickets, data: guests },
        isBuyer,
      };
    }
  }

  // POST TO GUESTS DATABASE
  await postGuests(guests);

  // POST TO RESERVATIONS DATABASE
  await patchOrder(orderData);

  // NAVIGATE
  if (isGoingBack) {
    await Processing(600);
  } else {
    await Processing(1000);
  }

  return {
    ...prev,
    step: isGoingBack ? prev.step - 1 : prev.step + 1,
    errors: {},
    orderData,
    tickets: { ...prev.tickets, data: guests },
    isBuyer,
  };
}

// BOOKING FLOW || STEP THREE
export async function submitStepThree(prev, formData) {
  const isGoingBack = Boolean(formData.get("isGoingBack"));
  const orderData = { ...prev.orderData };

  // COLLECT CUSTOMER DATA
  if (!orderData.name || !orderData.email) {
    orderData.name = formData.get("name");
    orderData.email = formData.get("email");
  }

  // COLLECT PAYMENT
  const cardDetails = {};

  cardDetails.cardNumber = Boolean(formData.get("cardNumber"));
  cardDetails.cardExp = Boolean(formData.get("cardExp"));
  cardDetails.cardSec = Boolean(formData.get("cardSec"));
  cardDetails.cardHolder = Boolean(formData.get("cardHolder"));

  // FORM VALIDATION
  const errors = {};

  if (!isGoingBack) {
    if (!orderData.name || orderData.name.length <= 1) {
      errors.name = "Please enter your name.";
    }

    if (
      !orderData.email ||
      !orderData.email.includes("@") ||
      !orderData.email.includes(".")
    ) {
      errors.email = "Please enter your email.";
    }

    if (
      !cardDetails.cardNumber ||
      !cardDetails.cardExp ||
      !cardDetails.cardSec ||
      !cardDetails.cardHolder
    ) {
      errors.cardDetails = "Please check your card details.";
    } else {
      orderData.paid = true;
    }

    if (errors.name || errors.email || errors.cardDetails) {
      await Processing(1000);
      return {
        ...prev,
        success: false,
        errors,
        orderData,
      };
    }
  }

  // POST TO RESERVATIONS

  await patchOrder(orderData);
  if (isGoingBack) {
    await Processing(600);
    return {
      ...prev,
      step: isGoingBack ? prev.step - 1 : prev.step,
      success: false,
      errors: {},
      orderData,
    };
  } else {
    await Processing(2000);
  }
}

export async function submitTicketReservation(prev, formData) {
  const errors = {};
  const orderDetails = {};

  //  BOOKING FLOW || STEP ONE
  if (prev.activeStep === 1) {
    // COLLECT RESERVATION
    const data = {};
    data.area = formData.get("area");
    data.amount =
      Number(formData.get("Partout Ticket")) +
      Number(formData.get("VIP Ticket"));

    // COLLECT ORDER
    orderDetails.partoutGuests = Array(
      Number(formData.get("Partout Ticket"))
    ).fill("partoutGuests");
    orderDetails.vipGuests = Array(Number(formData.get("VIP Ticket"))).fill(
      "vipGuests"
    );
    orderDetails.campingArea = data.area;
    orderDetails.greenFee = Boolean(formData.get("greenFee"));

    // FORM VALIDATION
    if (!data.amount || data.amount < 1) {
      errors.tickets = "Please select your tickets.";
    }

    if (
      Number(formData.get("Partout Ticket")) > 10 ||
      Number(formData.get("VIP Ticket")) > 10
    ) {
      errors.tickets = "Please limit your selection to 10 tickets.";
    }
    if (errors.tickets) {
      return { activeStep: prev.activeStep, success: false, errors };
    }

    // PUT RESERVATION
    const response = await putReservation(data);
    if (response) {
      orderDetails.reservationId = response.id;
      revalidatePath("/");
      return { activeStep: 2, success: true, errors: {}, orderDetails };
    } else {
      return { activeStep: prev.activeStep, success: false, errors: {} };
    }
  }

  // BOOKING FLOW || STEP TWO
  if (prev.activeStep === 2) {
    // REASSIGN VALUES FROM PREVIOUS STEP TO ORDER DETAILS
    Object.assign(orderDetails, prev.orderDetails);

    // COLLECT PARTOUT GUESTS INFORMATION
    orderDetails.partoutGuests = formData
      .getAll("partoutName")
      .map((str) => ({ name: str }));

    orderDetails.partoutGuests.forEach(function (guest, id) {
      const emails = formData.getAll("partoutEmail");
      guest.email = emails[id];
    });

    // COLLECT VIP GUESTS INFORMATION
    orderDetails.vipGuests = formData
      .getAll("vipName")
      .map((str) => ({ name: str }));

    orderDetails.vipGuests.forEach(function (guest, id) {
      const emails = formData.getAll("vipEmail");
      guest.email = emails[id];
    });

    // IS BUYER GOING?
    if (formData.get("isBuyerGuest")) {
      if (!orderDetails.vipGuests.length) {
        orderDetails.customerName = orderDetails.partoutGuests[0].name;
        orderDetails.customerEmail = orderDetails.partoutGuests[0].email;
      }
      if (!orderDetails.partoutGuests.length) {
        orderDetails.customerName = orderDetails.vipGuests[0].name;
        orderDetails.customerEmail = orderDetails.vipGuests[0].email;
      }
    }

    // FORM VALIDATION
    orderDetails.partoutGuests.map((guest) => {
      if (!guest.name || guest.name.length <= 1) {
        errors.ticketGuestsName =
          "Please provide the name and email of each ticket holder.";
      }
      if (!guest.email || !guest.email.includes(".")) {
        errors.ticketGuestsEmail =
          "Please provide the name and email of each ticket holder.";
      }
    });

    orderDetails.vipGuests.map((guest) => {
      if (!guest.name || guest.name.length <= 1) {
        errors.ticketGuestsName =
          "Please provide the name of each ticket holder.";
      }
      if (!guest.email || !guest.email.includes(".")) {
        errors.ticketGuestsEmail =
          "Please provide the email of each ticket holder.";
      }
    });

    // COLLECT TENT ORDER
    orderDetails.tentDouble = Number(formData.get("Double Person Tent")) * 2;
    orderDetails.tentTriple = Number(formData.get("Triple Person Tent")) * 3;

    if (
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length === 1 &&
      orderDetails.tentDouble > 2
    ) {
      errors.tentSetup = "Please fill up all available tent space.";
    }

    if (
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length > 1 &&
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length <
        orderDetails.tentDouble + orderDetails.tentTriple
    ) {
      errors.tentSetup = "Please fill up all available tent space.";
    }
    if (
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length > 1 &&
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length >
        orderDetails.tentDouble + orderDetails.tentTriple
    ) {
      errors.tentSetup = "Please ensure room for all guests.";
    }

    if (
      errors.ticketGuestsName ||
      errors.ticketGuestsEmail ||
      errors.tentSetup
    ) {
      return {
        ...prev,
        success: false,
        errors,
        orderDetails,
      };
    }

    return { activeStep: 3, errors: {}, orderDetails, ...prev };
  }

  // BOOKING FLOW || STEP THREE
  if (prev.activeStep === 3) {
    // REASSIGN VALUES FROM PREVIOUS STEP TO ORDER DETAILS
    Object.assign(orderDetails, prev.orderDetails);

    // COLLECT CUSTOMER INFORMATION
    orderDetails.customerName = formData.get("name");
    orderDetails.customerEmail = formData.get("email");

    // COLLECT FAKE PAYMENT DATA
    const fakeCreditCard = {};
    if (formData.get("cardNumber")) {
      fakeCreditCard.cardNumber = "1234123412341234";
    }
    if (formData.get("cardExp")) {
      fakeCreditCard.cardExp = "12/25";
    }
    if (formData.get("cardSecurityCode")) {
      fakeCreditCard.cardSecurityCode = "123";
    }
    if (formData.get("cardHolder")) {
      fakeCreditCard.cardHolder = "John Doe";
    }

    // FORM VALIDATION
    if (!orderDetails.customerName || orderDetails.customerName.length <= 1) {
      errors.customerName = "Please provide your name.";
    }
    if (
      !orderDetails.customerEmail ||
      !orderDetails.customerEmail.includes(".")
    ) {
      errors.customerEmail = "Please provide a valid email address.";
    }
    // if (
    //   !formData.get("cardNumber") ||
    //   formData.get("cardNumber").length != 16 ||
    //   !formData.get("cardExp") ||
    //   formData.get("cardExp").length > 5 ||
    //   !formData.get("cardSecurityCode") ||
    //   !formData.get("cardSecurityCode").length !== 3 ||
    //   !formData.get("cardHolder") ||
    //   !formData.get("cardHolder").length > 2
    // ) {
    //   errors.payment = "Please check your card details.";
    // }

    if (errors.customerName || errors.customerEmail) {
      return {
        activeStep: prev.activeStep,
        success: false,
        errors,
        orderDetails,
      };
    }

    // UPDATE TENT QUANTITY
    orderDetails.tentDouble = prev.orderDetails.tentDouble / 2;
    orderDetails.tentTriple = prev.orderDetails.tentTriple / 3;

    // PRICE SUMUP
    const pricePartout = orderDetails.partoutGuests.length * 799;
    const priceVip = orderDetails.vipGuests.length * 1299;
    const priceTentsDouble = orderDetails.tentDouble * 299;
    const priceTentsTriple = orderDetails.tentTriple * 399;
    orderDetails.priceTotal =
      pricePartout +
      priceVip +
      (orderDetails.tentDouble && priceTentsDouble) +
      (orderDetails.tentTriple && priceTentsTriple) +
      (orderDetails.greenFee && 249) +
      99;

    // FULLFIL RESERVATION
    const data = {};
    data.id = orderDetails.reservationId;

    // POST RESERVATION
    const response = await postReservation(data);
    if (response) {
      delete orderDetails.reservationId;
      await postOrder(orderDetails);
      revalidatePath("/");
    }
  }
}
