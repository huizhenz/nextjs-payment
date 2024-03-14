"use client";

import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
// 결제를 만들 때 주문 아이디(orderId)가 필요
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// clientKey는 위젯을 렌더링하는 상점을 식별
const widgetClientKey = process.env.NEXT_PUBLIC_PAY_CLIENT_KEY;

// 구매자의 고유 아이디를 불러와서 customerKey로 설정
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않음
const customerKey = process.env.NEXT_PUBLIC_PAY_CUSTOM_KEY;

// 비회원 결제
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS)

export default function CheckoutPage() {
  // router
  const router = useRouter();

  // PaymentWidget 인스턴스는 결제위젯을 렌더링
  const [paymentWidget, setPaymentWidget] = useState(null);
  // PaymentWidget Ref
  const paymentMethodsWidgetRef = useRef(null);

  const [price, setPrice] = useState(5_000);

  useEffect(() => {
    // SDK에서 loadPaymentWidget을 불러오기
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(
          // loadPaymentWidget은 파라미터로 clientKey랑 customerKey를 받음
          widgetClientKey,
          customerKey
        );
        // loadPaymentWidget는 PaymentWidget 인스턴스를 반환하는 메서드
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // renderPaymentMethods()로 결제위젯을 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    // paymentMethodsWidgetRef => useRef를 사용해서 인스턴스 저장
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  // price가 변동이 있으면 paymentMethodsWidget 렌더링
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  // 결제 요청 메서드
  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "The Lake Hotel",
        customerName: "Hyejin Jang",
        customerEmail: "test@test.com",
        customerMobilePhone: "01012345678",
        // 리다이렉트 URL
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div>
      {/* 할인 쿠폰 */}
      {/* <label htmlFor="coupon-box">
        <input
          id="coupon-box"
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 5_000 : price + 5_000);
          }}
        />
        <span>5,000원 쿠폰 적용</span>
      </label> */}
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/* 결제하기 버튼 */}
      <Button onClick={handlePaymentRequest}>결제하기</Button>
    </div>
  );
}

// http://localhost:3000/success?paymentType=NORMAL&orderId=FT_qIvtwgMgYc4eq3_vlh&paymentKey=PoxJmeD4pZORzdMaqN3wyLozg0NpdMr5AkYXQGwyEb21W9v7&amount=50000
