"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";

import { nanoid } from "nanoid";

import { useQuery } from "@tanstack/react-query";

import { useBookingDisconutStore } from "@/stores/bookingStore";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
const widgetClientKey: string = process.env.NEXT_PUBLIC_PAY_CLIENT_KEY ?? "";
const customerKey = ANONYMOUS;

function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}

export default function Checkout() {
  const { bookingPrice } = useBookingDisconutStore();

  // const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

  const { data: paymentWidget } = usePaymentWidget(
    widgetClientKey,
    customerKey
  );

  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const [price, setPrice] = useState(50_000);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // ------  결제위젯 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;

    // ------  이용약관 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement("#agreement", {
      variantKey: "AGREEMENT",
    });
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(bookingPrice);
  }, [bookingPrice]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/booking/success`,
        failUrl: `${window.location.origin}/booking/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <main>
      <div className="wrapper">
        <div className="box_section">
          <div id="payment-widget" style={{ width: "100%" }} />
          <div id="agreement" style={{ width: "100%" }} />
          <div style={{ paddingLeft: "24px" }}></div>
          <div className="result wrapper">
            <button
              className="button"
              style={{ marginTop: "30px" }}
              onClick={handlePaymentRequest}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// // React
// import React, { useEffect, useRef, useState } from "react";

// // @tosspayments/payment-widget-sdk
// import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";

// // 결제를 만들 때 필요한 주문 아이디(orderId)
// import { customAlphabet } from "nanoid";

// // shadcn/ui
// import { Button } from "@/components/ui/button";

// // zustand
// import { useBookingDisconutStore } from "@/stores/bookingStore";

// export default function CheckoutPage() {
//   // user의 id 받아오는 놈 ?
//   // const { data } = useSession();

//   // 뭐하는 놈이지
//   // const paymentWidgetRef = (useRef < PaymentWidgetInstance) | (null > null);
//   // const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);

//   // clientKey는 위젯을 렌더링하는 상점을 식별
//   const widgetClientKey = process.env.NEXT_PUBLIC_PAY_CLIENT_KEY;

//   // 구매자의 고유 아이디를 불러와서 customerKey로 설정
//   // 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않음
//   const customerKey = ANONYMOUS;

//   // 가격
//   const price = 15000;
//   // const [price, setPrice] = useState(0);

//   // zustand
//   const { bookingPrice } = useBookingDisconutStore();

//   useEffect(() => {
//     // 결제창 로드
//     (async () => {
//       const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

//       const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
//         "#payment-widget",
//         price
//       );
//       paymentWidget.renderAgreement("#agreement");

//       paymentWidgetRef.current = paymentWidget;
//       paymentMethodsWidgetRef.current = paymentMethodsWidget;
//     })();
//   }, []);

//   // 주문번호 생성 로직
//   const today = new Date();
//   const year = today.getFullYear().toString().slice(-2);
//   const month = (today.getMonth() + 1).toString().padStart(2, "0");
//   const day = today.getDate().toString().padStart(2, "0");
//   const yymmdd = year + month + day;

//   const customNanoid = customAlphabet(
//     "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
//     5
//   );
//   const orderId = yymmdd + customNanoid();

//   //
//   const proceedPayment = async () => {
//     const paymentWidget = paymentWidgetRef.current;

//     try {
//       await paymentWidget?.requestPayment({
//         orderId: orderId,
//         orderName: orderTitle,
//         customerName: "Hyejin Jang",
//         successUrl: `${window.location.origin}/order/success`,
//         failUrl: `${window.location.origin}/order/fail`,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // useEffect(() => {
//   //   // SDK에서 loadPaymentWidget을 불러오기
//   //   const fetchPaymentWidget = async () => {
//   //     try {
//   //       const loadedWidget = await loadPaymentWidget(
//   //         // loadPaymentWidget은 파라미터로 clientKey랑 customerKey를 받음
//   //         widgetClientKey,
//   //         customerKey
//   //       );
//   //       // loadPaymentWidget는 PaymentWidget 인스턴스를 반환하는 메서드
//   //       setPaymentWidget(loadedWidget);
//   //     } catch (error) {
//   //       console.error("Error fetching payment widget:", error);
//   //     }
//   //   };

//   //   fetchPaymentWidget();
//   // }, []);

//   // useEffect(() => {
//   //   if (paymentWidget == null) {
//   //     return;
//   //   }

//   //   // renderPaymentMethods()로 결제위젯을 렌더링
//   //   const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
//   //     "#payment-widget",
//   //     { value: priceRef.current },
//   //     { variantKey: "DEFAULT" }
//   //   );

//   //   paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

//   //   // paymentMethodsWidgetRef => useRef를 사용해서 인스턴스 저장
//   //   paymentMethodsWidgetRef.current = paymentMethodsWidget;
//   // }, [paymentWidget]);

//   // // price가 변동이 있으면 paymentMethodsWidget 렌더링
//   // useEffect(() => {
//   //   const paymentMethodsWidget = paymentMethodsWidgetRef.current;

//   //   if (paymentMethodsWidget == null) {
//   //     return;
//   //   }

//   //   paymentMethodsWidget.updateAmount(priceRef.current);
//   // }, []);

//   // // 결제 요청 메서드
//   // const handlePaymentRequest = async () => {
//   //   // 결제를 요청하기 전에 orderId, amount를 서버에 저장
//   //   // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도
//   //   try {
//   //     await paymentWidget?.requestPayment({
//   //       orderId: nanoid(),
//   //       orderName: "The Lake Hotel",
//   //       customerName: "Hyejin Jang",
//   //       customerEmail: "test@test.com",
//   //       customerMobilePhone: "01012345678",
//   //       // 리다이렉트 URL
//   //       successUrl: `${window.location.origin}/success`,
//   //       failUrl: `${window.location.origin}/fail`,
//   //       amount: priceRef.current,
//   //     });
//   //   } catch (error) {
//   //     console.error("Error requesting payment:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   priceRef.current = bookingPrice; // bookingPrice 값이 업데이트될 때마다 priceRef를 업데이트합니다.
//   // }, [bookingPrice]);

//   // console.log(bookingPrice);

//   return (
//     <main>
//       <div>
//         <div id="payment-widget" />
//         <div id="agreement" />
//         <button type="button" onClick={proceedPayment}>
//           결제하기
//         </button>
//       </div>
//     </main>
//     // <div>
//     //   {/* 할인 쿠폰 */}
//     //   {/* <label htmlFor="coupon-box">
//     //     <input
//     //       id="coupon-box"
//     //       type="checkbox"
//     //       onChange={(event) => {
//     //         setPrice(event.target.checked ? price - 5_000 : price + 5_000);
//     //       }}
//     //     />
//     //     <span>5,000원 쿠폰 적용</span>
//     //   </label> */}
//     //   {/* 결제 UI, 이용약관 UI 영역 */}
//     //   <div id="payment-widget" />
//     //   <div id="agreement" />
//     //   {/* 결제하기 버튼 */}
//     //   {/* <Button onClick={handlePaymentRequest}>결제하기</Button> */}
//     // </div>
//   );
// }

// 비회원 결제
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS)

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
