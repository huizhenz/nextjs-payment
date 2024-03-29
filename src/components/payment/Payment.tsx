import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

import Checkout from "@/app/booking/Checkout";

export default function Payment() {
  return (
    <Card className={cn("w-[42rem]")}>
      <Checkout />
    </Card>
  );
}
