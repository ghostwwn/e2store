import { z } from "zod";

// Cart item validation schema
export const CartItemSchema = z.object({
  id: z.string().min(1, "Item ID is required"),
  name: z.string().min(1, "Item name is required").max(100, "Item name too long"),
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  price: z.string().min(1, "Price is required"), // More flexible price validation
  originalPrice: z.string().optional(),
  icon: z.string().min(1, "Icon is required"),
  currency: z.string().min(1, "Currency is required"),
  features: z.array(z.string()).optional()
});

// URL validation schema
export const UrlSchema = z.string().url("Invalid URL format");

// Instagram handle validation
export const InstagramHandleSchema = z.string()
  .min(1, "Instagram handle is required")
  .max(30, "Instagram handle too long")
  .regex(/^[a-zA-Z0-9._]{1,30}$/, "Invalid Instagram handle format");

// Discord invite validation
export const DiscordInviteSchema = z.string()
  .regex(/^https:\/\/discord\.gg\/[a-zA-Z0-9]{1,20}$/, "Invalid Discord invite format");

// Price validation with currency parsing (supports Arabic currency)
export const PriceSchema = z.string()
  .transform((val) => {
    // Handle Arabic currency د.ك
    if (val.startsWith('د.ك')) {
      return val.substring(3);
    }
    // Handle other currencies
    return val.replace(/[$,]/g, '');
  })
  .pipe(z.coerce.number().min(0, "Price must be positive"));

export type CartItem = z.infer<typeof CartItemSchema>;
export type ValidatedPrice = z.infer<typeof PriceSchema>;