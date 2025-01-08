import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// CURRENT RESERVATION IN SESSION
const useSessionStore = create((set) => ({
  activeStep: 1,
  reservationId: "",
  actions: {
    setActiveStep: (step) => set(() => ({ activeStep: step })),
    setReservationId: (id) => set(() => ({ reservationId: id })),
  },
}));

export const useSession = () =>
  useSessionStore(
    useShallow((state) => ({
      activeStep: state.activeStep,
      reservationId: state.reservationId,
    }))
  );

export const useSessionActions = () =>
  useSessionStore((state) => state.actions);
