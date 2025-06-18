import { z } from "zod";

const FileSchema = z.object({
  uri: z.string().url(),
  cdn_uri: z.string().url(),
  mime: z.string(),
});

const ContentSchema = z.object({
  $schema: z.string().url(),
  json_uri: z.string().url(),
  files: z.array(FileSchema),
});

const AuthoritySchema = z.object({
  address: z.string(),
  scopes: z.array(z.string()),
});

const CompressionSchema = z.object({
  eligible: z.boolean(),
  compressed: z.boolean(),
  data_hash: z.string(),
  creator_hash: z.string(),
  asset_hash: z.string(),
  tree: z.string(),
  seq: z.number(),
  leaf_id: z.number(),
});

const GroupingSchema = z.object({
  group_key: z.string(),
  group_value: z.string(),
});

const RoyaltySchema = z.object({
  royalty_model: z.string(),
  target: z.string().nullable(),
  percent: z.number(),
  basis_points: z.number(),
  primary_sale_happened: z.boolean(),
  locked: z.boolean(),
});

const CreatorSchema = z.object({
  address: z.string(),
  share: z.number(),
  verified: z.boolean(),
});

const OwnershipSchema = z.object({
  frozen: z.boolean(),
  delegated: z.boolean(),
  delegate: z.string().nullable(),
  ownership_model: z.string(),
  owner: z.string(),
});

const SupplySchema = z.object({
  print_max_supply: z.number(),
  print_current_supply: z.number(),
  edition_nonce: z.number(),
});

export const NftItemSchema = z.object({
  interface: z.string(),
  id: z.string(),
  content: ContentSchema,
  authorities: z.array(AuthoritySchema),
  compression: CompressionSchema,
  grouping: z.array(GroupingSchema),
  royalty: RoyaltySchema,
  creators: z.array(CreatorSchema),
  ownership: OwnershipSchema,
  supply: SupplySchema,
  mutable: z.boolean(),
  burnt: z.boolean(),
});

export const NftItemDocumentSchema = z.object({
  interface: z.string(),
  id: z.string(),
  content: ContentSchema,
  authorities: z.array(AuthoritySchema),
  compression: CompressionSchema,
  grouping: z.array(GroupingSchema),
  royalty: RoyaltySchema,
  creators: z.array(CreatorSchema),
  ownership: OwnershipSchema,
  supply: SupplySchema,
  mutable: z.boolean(),
  burnt: z.boolean(),
});

export const NftItemDocumentListSchema = z.array(NftItemSchema);
