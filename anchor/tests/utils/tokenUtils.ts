import { LiteSVM } from "litesvm";
import { PublicKey } from "@solana/web3.js";
import * as token from "@solana/spl-token";
import { LAMPORTS_INIT_BALANCE } from "./testUtils";
import { BN, getProvider } from "@coral-xyz/anchor";
import {
  ACCOUNT_SIZE,
  AccountLayout,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
const MINT_DECIMALS = 6;
var MINT_ADDRESS: PublicKey;

/**
 * Initializes a mock USDC mint account within the local Solana test environment.
 *
 * This function sets up a predefined mint account by specifying its public key,
 * lamport balance, account data, owner, and rent epoch. It is primarily used
 * for testing purposes to simulate the presence of the USDC mint.
 *
 * @async
 * @function initMint
 * @returns PublicKey
 */
const initMint = (client: LiteSVM): PublicKey => {
  let mintPubkey: PublicKey = new PublicKey(
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  );
  client.setAccount(mintPubkey, {
    lamports: 389258830918,
    data: Buffer.from(
      "AQAAAJj+huiNm+Lqi8HMpIeLKYjCQPUrhCS/tA7Rot3LXhmbSPXZXjEPJQAGAQEAAABicKqKWcWUBbRShshncubNEm6bil06OFNtN/e0FOi2Zw==",
      "base64"
    ),
    owner: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    executable: false,
    rentEpoch: 18446744073,
  });

  // Store the mint address and authority in global variables
  MINT_ADDRESS = mintPubkey;
  return MINT_ADDRESS;
};

/**
 * Converts an amount to the token's decimal format.
 *
 * @param {number} amount - The amount to convert.
 * @returns {number} The amount in the token's decimal format.
 */
const convertAmountToDecimals = (amount: number): BN => {
  return new BN(amount * 10 ** MINT_DECIMALS);
};

/**
 * Convert an amount from the token's decimal format to the original format.
 *
 * @param {number} amount - The amount in the token's decimal format.
 * @returns {number} The original amount.
 */
const convertFromDecimalsToAmount = (amount: number): BN => {
  return new BN(amount / 10 ** MINT_DECIMALS);
};

export const INITIAL_USER_ATA_BALANCE = convertAmountToDecimals(10000);

/**
 * Creates a new Associated Token Account for the given payer, owner and mint address
 *
 * @param {Keypair} payer - The payer of the transaction fees.
 * @param {PublicKey} owner - The owner's public key.
 * @param {PublicKey} mintAddress - The mint address. Default is the global MINT_ADDRESS.
 * @returns {Promise<PublicKey>} The created ATA public key.
 */
const getOrCreateATA = async (
  client: LiteSVM,
  owner: PublicKey,
  mintAddress: PublicKey = MINT_ADDRESS
): Promise<PublicKey> => {
  const ata = getAssociatedTokenAddressSync(mintAddress, owner, true);
  const rawAccount = client.getAccount(ata);
  if (!rawAccount) {
    return createAta(client, ata, owner);
  }
  return ata;
};

const createAta = (
  client: LiteSVM,
  ata: PublicKey,
  owner: PublicKey,
  mintAddress: PublicKey = MINT_ADDRESS
): PublicKey => {
  const tokenAccData = Buffer.alloc(ACCOUNT_SIZE);
  AccountLayout.encode(
    {
      mint: mintAddress,
      owner: owner,
      amount: 0n,
      delegateOption: 0,
      delegate: PublicKey.default,
      delegatedAmount: 0n,
      state: 1,
      isNativeOption: 0,
      isNative: 0n,
      closeAuthorityOption: 0,
      closeAuthority: PublicKey.default,
    },
    tokenAccData
  );
  client.setAccount(ata, {
    lamports: LAMPORTS_INIT_BALANCE,
    data: tokenAccData,
    owner: TOKEN_PROGRAM_ID,
    executable: false,
  });
  return ata;
};

/**
 * Mints a specified amount of tokens to the given account.
 *
 * @param {Keypair} payer - The payer of the transaction fees.
 * @param {PublicKey} toAccount - The account to mint tokens to.
 * @param {BN} amount - The amount of tokens to mint.
 */
const mintAmountTo = (
  client: LiteSVM,
  ata: PublicKey,
  owner: PublicKey,
  amount: BN,
  mintAddress: PublicKey = MINT_ADDRESS
): PublicKey => {
  const account = client.getAccount(ata);
  if (!account) {
    throw new Error("Cannot mint for an account that is not initialized");
  }
  const accountData = AccountLayout.decode(account.data);
  const initialBalance = accountData.amount;
  const tokenAccData = Buffer.alloc(ACCOUNT_SIZE);

  AccountLayout.encode(
    {
      mint: mintAddress,
      owner: owner,
      amount: initialBalance + BigInt(amount.toString()),
      delegateOption: 0,
      delegate: PublicKey.default,
      delegatedAmount: 0n,
      state: 1,
      isNativeOption: 0,
      isNative: 0n,
      closeAuthorityOption: 0,
      closeAuthority: PublicKey.default,
    },
    tokenAccData
  );
  client.setAccount(ata, {
    lamports: LAMPORTS_INIT_BALANCE,
    data: tokenAccData,
    owner: TOKEN_PROGRAM_ID,
    executable: false,
  });
  return ata;
};

/**
 * Retrieves the balance of an Associated Token Account (ATA) in BN format.
 *
 * @async
 * @param {PublicKey} ataAddress - The address of the Associated Token Account to retrieve the balance for.
 * @returns {Promise<BN>} A promise that resolves to the balance of the ATA as a BN (Big Number) object.
 */
export const getAtaBalance = async (ataAddress: PublicKey): Promise<BN> => {
  const account = await token.getAccount(getProvider().connection, ataAddress);
  return new BN(account.amount.toString());
};

export {
  MINT_ADDRESS,
  MINT_DECIMALS,
  initMint,
  getOrCreateATA,
  mintAmountTo,
  convertAmountToDecimals,
  convertFromDecimalsToAmount,
};
