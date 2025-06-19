import { z } from "zod";

export const MinimalNFTSchema = z.object({
  id: z.string(),
  interface: z.literal("ProgrammableNFT"),

  content: z.object({
    json_uri: z.string().url(),

    links: z.object({
      image: z.string().url(),
      external_url: z.string().url().optional(),
    }),

    metadata: z.object({
      name: z.string(),
      symbol: z.string().optional(),
      description: z.string().optional(),
      attributes: z
        .array(
          z.object({
            trait_type: z.string(),
            value: z.union([z.string(), z.number()]),
          })
        )
        .optional(),
    }),
  }),

  ownership: z.object({
    owner: z.string(),
  }),

  grouping: z
    .array(
      z.object({
        group_key: z.string(),
        group_value: z.string(),
      })
    )
    .optional(),

  creators: z
    .array(
      z.object({
        address: z.string(),
        verified: z.boolean().optional(),
        share: z.number().optional(),
      })
    )
    .optional(),
});
