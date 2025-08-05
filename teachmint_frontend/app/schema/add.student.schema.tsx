import z from "zod";
export const StudentAddSchema = z
  .object({
    classId: z.number().min(1, { message: "Enter Valid ClassId" }),
    studentId:  z.number().min(1, { message: "StudentId" }),
  })
  