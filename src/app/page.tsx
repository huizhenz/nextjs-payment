// Components
import UserInfo from "@/components/userInfo/UserInfo";
import Request from "@/components/request/Request";
import Discount from "@/components/discount/Discount";
import Payment from "@/components/payment/Payment";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="text-3xl my-10">예약확정/결제하기</div>
      <UserInfo />
      <Request />
      <Discount />
      <Payment />
    </div>
  );
}
