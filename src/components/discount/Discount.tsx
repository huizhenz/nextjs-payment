"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { useBookingInfoStore } from "@/stores/bookingStore";

interface Coupon {
  id: number;
  content: string;
  discount: string;
  used: boolean;
}

export default function Discount() {
  const form = useForm();

  const { selectCoupon, enterPoint } = useBookingInfoStore();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/users");
        setCoupons(data[0].coupons);
        setPoint(data[0].point);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCouponChange = () => {
    selectCoupon(form.watch().coupon);
  };

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    enterPoint(Number(e.currentTarget.value));
  };

  return (
    <Card className={cn("w-[42rem]")}>
      <CardHeader>
        <CardTitle>할인코드/쿠폰/포인트</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onChange={form.handleSubmit(handleCouponChange)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="coupon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>쿠폰</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="할인 쿠폰을 선택해주세요." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {coupons.map((coupon) => {
                        return (
                          <SelectItem key={coupon.id} value={coupon.discount}>
                            {coupon.content}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Form {...form}>
          <FormLabel>포인트</FormLabel>
          <Input
            placeholder="1,000 포인트부터 사용 가능"
            onChange={handlePointChange}
            // 포커스가 떠날 때 값을 검증
            onBlur={(e) => {
              if (parseInt(e.currentTarget.value) > point) {
                alert("보유 포인트를 초과하셨습니다.");
                e.currentTarget.value = "";
                enterPoint(Number(e.currentTarget.value));
                return;
              }

              if (parseInt(e.currentTarget.value) < 1000) {
                alert("1,000 포인트부터 사용 가능합니다.");
                e.currentTarget.value = "";
                enterPoint(Number(e.currentTarget.value));
                return;
              }
            }}
          />
          <FormDescription>
            보유 포인트 {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </FormDescription>
        </Form>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
}

{
  /* <Form {...form}>
<form onChange={handlePointChange} className="w-2/3 space-y-6">
  <FormField
    control={form.control}
    name="points"
    render={({ field }) => (
      <FormItem>
        <FormLabel>포인트</FormLabel>
        <FormControl>
          <Input
            placeholder="1,000 포인트 이상부터 사용 가능"
            // defaultValue={field.value}
            {...field}
          />
        </FormControl>
        <FormDescription>보유 포인트 {points}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</form>
</Form> */
}
