import { z } from "zod";

export const UpdateTierListSchema = z.object({
  tierList: z.array(
    z.object({
      color: z.string().min(1),
      text: z.string(),
      tierListSelectedItems: z.array(
        z.object({
          src: z.string(),
          opacity: z.string().optional(),
        })
      ),
    })
  ),
});
