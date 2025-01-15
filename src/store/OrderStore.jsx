import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// ORDER DATA
const useOrderStore = create((set) => ({
  orderData: "",
  actions: {
    setOrderData: (data) =>
      set(() => ({
        orderData: { ...data },
      })),
  },
}));

export const useOrder = () =>
  useOrderStore(
    useShallow((state) => ({
      orderData: state.orderData,
    }))
  );
export const useOrderActions = () => useOrderStore((state) => state.actions);
