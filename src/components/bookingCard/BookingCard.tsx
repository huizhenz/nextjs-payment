"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Image from "next/image";
import { useBookingInfoStore } from "@/stores/bookingStore";
import BookingButton from "../button/BookingButton";

interface Hotel {
  id: number;
  location: string;
  name: string;
  price: number;
}

export default function BookingCard() {
  const form = useForm();

  // const coupon = useBookingDisconutStore((state) => state.coupon);
  const { coupon, point, bookingPrice, discountPrice } = useBookingInfoStore();

  const [hotels, setHotels] = useState<Hotel>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/hotels");
        setHotels(data[0]);
        discountPrice(data[0].price - parseInt(coupon) - point);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [coupon, point, discountPrice]);

  function onSubmit() {}

  return (
    <div>
      <Card className="w-[400px] h-[800px]">
        <CardHeader>
          <CardTitle>결제금액</CardTitle>
        </CardHeader>
        <div className="flex space-x-5 m-4">
          <Image
            className="rounded-2xl"
            width={160}
            height={100}
            src="/hotelImage.png"
            alt="Hotel Image"
          />
          <div className="flex flex-col">
            <div>{hotels?.location}</div>
            <div>{hotels?.name}</div>
          </div>
        </div>
        <div className="border-b-2"></div>
        <CardContent>
          {/* <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            ></form>
          </Form> */}
          <div>
            4박 :
            {hotels?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </div>
          <div>쿠폰 : - {coupon.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
          <div>
            포인트 : - {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
          <div>
            총합계 :{" "}
            {bookingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </div>
        </CardContent>
      </Card>{" "}
      <BookingButton />
    </div>
  );
}
