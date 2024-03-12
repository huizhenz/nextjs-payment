import UserInfo from "@/components/userInfo/UserInfo";
import Request from "@/components/request/Request";
import Discount from "@/components/discount/Discount";

export default function Home() {
  return (
    <div>
      <div className="text-3xl my-6">예약확정/결제하기</div>
      <UserInfo />
      <Request />
      <Discount />
    </div>
  );
}
