import { BN } from "@coral-xyz/anchor";
import { Timestamp } from "firebase/firestore";
import z from "zod";

export const bnSchema = z.custom<BN>((val) => val instanceof BN);

/**
 * Zod schema that transforms multiple timestamp formats into a Firestore `Timestamp`.
 *
 * Accepts:
 * - Firestore `Timestamp` instances (returns as-is)
 * - Plain objects with `{ seconds, nanoseconds }`
 * - Native JavaScript `Date` objects
 *
 * Transforms the input into a Firestore `Timestamp` object.
 *
 * @returns A Firestore `Timestamp`
 *
 * @example
 * const ts = firestoreTimestampSchema.parse(new Date());
 * const ts = firestoreTimestampSchema.parse({ seconds: 1719330273, nanoseconds: 0 });
 * const ts = firestoreTimestampSchema.parse(Timestamp.now());
 */
export const firestoreTimestampSchema = z.union([
  z.instanceof(Timestamp),
  z
    .object({
      seconds: z.number(),
      nanoseconds: z.number(),
    })
    .transform(
      ({ seconds, nanoseconds }) => new Timestamp(seconds, nanoseconds)
    ),
  z.instanceof(Date).transform((date) => Timestamp.fromDate(date)),
]);

/**
 * Zod schema that transforms various Firestore timestamp representations into a native `Date`.
 *
 * Accepts:
 * - Firestore `Timestamp` instances
 * - Plain objects with `{ seconds, nanoseconds }`
 * - JavaScript `Date` objects (returned as-is)
 *
 * Transforms the input into a native JavaScript `Date`.
 *
 * @returns A `Date` object
 *
 * @example
 * const date = dateSchema.parse(Timestamp.now());
 * const date = dateSchema.parse({ seconds: 1719330273, nanoseconds: 0 });
 * const date = dateSchema.parse(new Date());
 */
export const dateSchema = z.union([
  z.instanceof(Date),
  z.instanceof(Timestamp).transform((ts) => ts.toDate()),
  z
    .object({
      seconds: z.number(),
      nanoseconds: z.number(),
    })
    .transform(
      ({ seconds, nanoseconds }) => new Date(seconds * 1000 + nanoseconds / 1e6)
    ),
]);
