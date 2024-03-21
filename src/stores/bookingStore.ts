import { create } from "zustand";

interface Booking {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  editUserInfo: (
    userInfo: Pick<Booking, "firstName" | "lastName" | "phoneNumber" | "email">
  ) => void;
  request: string;
  selectRequest: (selectedRequest: string) => void;
  coupon: string;
  selectCoupon: (selectedCoupon: string) => void; // setCoupon 함수의 타입 지정
  point: number;
  enterPoint: (enteredPoint: number) => void;
  bookingPrice: number;
  discountPrice: (enteredDiscout: number) => void;
}

// 초기 상태 설정
const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  request: "",
  coupon: "0",
  point: 0,
  bookingPrice: 0,
};

// Zustand 스토어 생성
export const useBookingInfoStore = create<Booking>((set) => ({
  ...initialState,
  editUserInfo: (
    userInfo: Pick<Booking, "firstName" | "lastName" | "phoneNumber" | "email">
  ): void => {
    set({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      phoneNumber: userInfo.phoneNumber,
      email: userInfo.email,
    });
  },
  selectRequest: (selectedRequest: string): void => {
    set({
      request: selectedRequest,
    });
  },
  selectCoupon: (selectedCoupon: string): void => {
    set({ coupon: selectedCoupon });
  },
  enterPoint: (enteredPoint: number): void => {
    set({ point: enteredPoint });
  },
  discountPrice: (enteredDiscout: number): void => {
    set({ bookingPrice: enteredDiscout });
  },
}));
