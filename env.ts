import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_MODE: z.enum(["production", "development", "test"]),
  EXPO_PUBLIC_API_URL: z.string(),
  EXPO_PUBLIC_ENABLE_API_DELAY: z
    .string()
    .transform((value) => value === "true"),
});

export const env = envSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_ENABLE_API_DELAY: process.env.EXPO_PUBLIC_ENABLE_API_DELAY,
  EXPO_PUBLIC_MODE: process.env.NODE_ENV,
});
