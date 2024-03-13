"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Image from "next/image";

interface Hotel {
  id: number;
  location: string;
  name: string;
  price: number;
}

export default function BookingCard() {
  const form = useForm();

  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/hotels");
      setHotels(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <div>{hotels[0]?.location}</div>
            <div>{hotels[0]?.name}</div>
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
          <div>4박 : {hotels[0]?.price}</div>
          <div>쿠폰 : </div>
          <div>포인트 : </div>
          <div>총합계 : </div>
        </CardContent>
      </Card>{" "}
      <CardFooter className="flex justify-between">
        <Button>예약하기</Button>
      </CardFooter>{" "}
    </div>
  );
}