import { z } from "zod";

export const UpdateTierListItemsSchema = z.array(
  z.object({
    src: z.string(),
  })
);
