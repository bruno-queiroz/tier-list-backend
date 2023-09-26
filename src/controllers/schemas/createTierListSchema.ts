import { z } from "zod";

export const CreateTierListSchema = z.object({
  tierListName: z.string().min(1),
  tierListImage: z.string().min(1),
  tierList: z.string().min(1),
  tierListItems: z.array(z.string()),
});
