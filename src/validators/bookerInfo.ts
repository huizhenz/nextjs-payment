import { z } from "zod";

const nameRegex = /^(?=.*[a-zA-Z])$/;

const phoneNumberRegex = /^010\d{8}$/;

export const bookerInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "2글자 이상 입력해 주세요." })
    .max(100, { message: "100글자 이하 입력해 주세요." })
    .regex(nameRegex, { message: "영문으로 입력해 주세요." }),
  lastName: z
    .string()
    .min(2, { message: "2글자 이상 입력해 주세요." })
    .max(100, { message: "100글자 이하 입력해 주세요." })
    .regex(nameRegex, { message: "영문으로 입력해 주세요." }),
  phoneNumber: z
    .string()
    .regex(phoneNumberRegex, { message: "전화번호를 올바르게 입력해 주세요." }),
  email: z.string().email({ message: "이메일을 올바르게 입력해 주세요." }),
});
