import { BN } from "@coral-xyz/anchor";
import z from "zod";

export const bnSchema = z.custom<BN>((val) => val instanceof BN);
