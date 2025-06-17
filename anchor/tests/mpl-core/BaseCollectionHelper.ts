import { createHash } from "crypto";
import { serialize, Schema } from "borsh";
import { PublicKey } from "@solana/web3.js";

/**
 * Generates the 8-byte Anchor discriminator for a given account name.
 * Anchor computes the discriminator by hashing the string `account:<AccountName>`
 * using SHA-256 and taking the first 8 bytes of the result.
 *
 * @param accountName - The name of the Anchor account.
 * @returns A 8-byte Buffer representing the discriminator.
 */
function getAnchorDiscriminator(accountName: string): Buffer {
  // Replace with actual logic if needed:
  // return createHash('sha256').update(`account:${accountName}`).digest().slice(0, 8);
  return Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
}

/**
 * Represents the BaseCollectionV1 account structure as defined by Metaplex Core.
 * This class is used for Borsh serialization.
 */
class BaseCollectionV1 {
  key: number;
  updateAuthority: Uint8Array;
  name: string;
  uri: string;
  numMinted: number;
  currentSize: number;

  /**
   * Creates a new instance of BaseCollectionV1.
   *
   * @param args - The fields for the collection account.
   */
  constructor(args: {
    key: number;
    updateAuthority: Uint8Array;
    name: string;
    uri: string;
    numMinted: number;
    currentSize: number;
  }) {
    this.key = args.key;
    this.updateAuthority = args.updateAuthority;
    this.name = args.name;
    this.uri = args.uri;
    this.numMinted = args.numMinted;
    this.currentSize = args.currentSize;
  }
}

/**
 * Borsh schema definition for the BaseCollectionV1 account.
 */
const BaseCollectionSchema: Schema = new Map([
  [
    BaseCollectionV1,
    {
      kind: "struct",
      fields: [
        ["key", "u8"],
        ["updateAuthority", [32]],
        ["name", "string"],
        ["uri", "string"],
        ["numMinted", "u32"],
        ["currentSize", "u32"],
      ],
    },
  ],
]);

/**
 * Serializes and encodes a `BaseCollectionV1` account into a Buffer using Borsh.
 * This is useful for mocking or manually initializing a BaseCollectionV1 account
 * in unit tests or test environments.
 *
 * @param args - The data fields required to construct the collection.
 * @returns A Buffer containing the serialized account data.
 */
export function encodeBaseCollectionV1(args: {
  updateAuthority: PublicKey;
  name: string;
  uri: string;
  numMinted: number;
  currentSize: number;
}): Buffer {
  const disc = getAnchorDiscriminator("BaseCollectionV1");

  const account = new BaseCollectionV1({
    key: 5, // 5 = Key::CollectionV1 in Metaplex Core
    updateAuthority: args.updateAuthority.toBuffer(),
    name: args.name,
    uri: args.uri,
    numMinted: args.numMinted,
    currentSize: args.currentSize,
  });

  const body = Buffer.from(serialize(BaseCollectionSchema, account));
  return Buffer.concat([body]); // If needed: Buffer.concat([disc, body]);
}
