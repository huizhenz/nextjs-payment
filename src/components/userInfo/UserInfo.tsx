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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function UserInfo() {
  const form = useForm();

  return (
    <Card className={cn("w-[42rem]")}>
      <CardHeader>
        <CardTitle>예약자 정보</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Form {...form}>
          <div className="flex">
            <FormField
              control={form.control}
              name="fistName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fist Name 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="Gildong" {...field} />
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
                    <Input placeholder="Hong" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number 전화번호</FormLabel>
                <FormControl>
                  <Input placeholder="1000000000" {...field} />
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
                    placeholder="예약 확정서를 해당 이메일로 발송하겠습니다."
                    {...field}
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
