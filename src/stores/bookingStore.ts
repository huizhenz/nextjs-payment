import { create } from "zustand";
import { nanoid } from "nanoid";
import axios from "axios";
import { useEffect } from "react";

interface Booking {
  // id: string;
  coupon: string;
  selectCoupon: (selectedCoupon: string) => void; // setCoupon 함수의 타입 지정
  point: number;
  enterPoint: (enteredPoint: number) => void;
  bookingPrice: number;
  discountPrice: (enteredDiscout: number) => void;
}

// 초기 상태 설정
const initialState = {
  // id: nanoid(),
  coupon: "0",
  point: 0,
  bookingPrice: 0,
};

// Zustand 스토어 생성
export const useBookingDisconutStore = create<Booking>((set) => ({
  ...initialState,
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
