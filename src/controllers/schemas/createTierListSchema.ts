import { z } from "zod";

export const CreateTierListSchema = z.object({
  tierListName: z.string().min(1),
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
  tierListItems: z.array(
    z.object({
      src: z.string(),
      opacity: z.string().optional(),
    })
  ),
  tierListImage: z.string().min(1),
});
