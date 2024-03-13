// Components
import UserInfo from "@/components/userInfo/UserInfo";
import Request from "@/components/request/Request";
import Discount from "@/components/discount/Discount";
import Payment from "@/components/payment/Payment";
import BookingCard from "@/components/bookingCard/BookingCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center my-16">
      <div className="text-3xl mb-16">예약확정/결제하기</div>
      <div className="flex justify-between space-x-16">
        <div className="space-y-9 ">
          <UserInfo />
          <Request />
          <Discount />
          <Payment />
        </div>
        <BookingCard />
      </div>
    </div>
  );
}
