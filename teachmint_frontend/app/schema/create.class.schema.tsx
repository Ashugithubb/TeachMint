import z from "zod";
export const classSchema = z
  .object({
    name: z.string().min(1, { message: "Name can't be empty" }),
    description: z.string({ message: 'Add Class Description' }),
    acadmicYear: z.string().min(6, { message: 'give acadmic Year (like 2022-2026)' }),
  })
  