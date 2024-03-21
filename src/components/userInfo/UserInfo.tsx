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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { bookerInfoSchema } from "@/validators/bookerInfo";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useBookingInfoStore } from "@/stores/bookingStore";

type bookerInfoType = z.infer<typeof bookerInfoSchema>;

export default function UserInfo() {
  const [userData, setUserData] = useState<bookerInfoType>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [clicked, setClicked] = useState<boolean>(true);

  const { firstName, editUserInfo } = useBookingInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/users");
        setUserData(data[0]);
        editUserInfo({
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          phoneNumber: data[0].phoneNumber,
          email: data[0].email,
        });
      } catch (error) {
        console.log("사용자 정보를 불러오지 못했습니다.");
      }
    };

    fetchData();
  }, []);

  const form = useForm<bookerInfoType>({
    resolver: zodResolver(bookerInfoSchema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: userData?.phoneNumber,
      email: userData?.email,
    },
  });

  // console.log(form.watch());

  const handleInput = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
      editUserInfo({
        firstName: userData?.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    // 해당 name을 가진 input에 입력이 들어왔을 때 수정
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card className={cn("w-[42rem]")}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>예약자 정보</CardTitle>
        <Button variant="default" onClick={handleInput}>
          {clicked ? "수정하기" : "수정완료"}
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <div className="flex flex-row justify-between">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name 이름</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      name="firstName"
                      disabled={clicked}
                      value={userData.firstName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name 성</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      disabled={clicked}
                      value={userData.lastName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number 전화번호</FormLabel>
                <FormControl>
                  <Input
                    disabled={clicked}
                    value={userData.phoneNumber}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail 이메일</FormLabel>
                <FormControl>
                  <Input
                    disabled={clicked}
                    value={userData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
}
