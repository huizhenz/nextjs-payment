import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

import CheckoutPage from "@/paymentWidget/Checkout";

export default function Payment() {
  return (
    <Card className={cn("w-[42rem]")}>
      <CheckoutPage />
    </Card>
  );
}
