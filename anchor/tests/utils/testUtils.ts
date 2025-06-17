import { LiteSVM } from "litesvm";
import {
  LAMPORTS_PER_SOL,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { MINT_ADDRESS } from "./tokenUtils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Befundr } from "../../target/types/befundr";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";
import { GLOBALS_SEED, NFT_ALLOCATION_SEED, PROJECT_SEED } from "./constants";

export const LAMPORTS_INIT_BALANCE = 1000 * LAMPORTS_PER_SOL; // 1000 SOL per wallet

/**
 * **************************************
 *             PDA CRUD UTILS
 * **************************************
 */

/**
 * Creates a new user wallet and funds it with SOL.
 *
 * @async
 * @returns {Promise<Keypair>} A promise that resolves to the newly created Keypair representing the user's wallet.
 */
export const createUserWalletWithSol = async (
  client: LiteSVM
): Promise<Keypair> => {
  const wallet = new Keypair();
  /** 
    const tx = await program.provider.connection.requestAirdrop(wallet.publicKey, LAMPORTS_INIT_BALANCE);
    await confirmTransaction(program, tx);*/
  client.airdrop(wallet.publicKey, BigInt(LAMPORTS_INIT_BALANCE));
  return wallet;
};

/**
 * Create User PDA
 * @param userData
 * @param wallet
 * @returns
 */
export const createProject = async (
  wallet: Keypair,
  payer: Keypair = wallet,
  metadata_uri: string,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);
  const globals = await program.account.globals.fetch(globalsPda);

  const [projectPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(PROJECT_SEED),
      globals.createdProjectCounter.toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  await program.methods
    .createProject(metadata_uri)
    .accountsPartial({
      project: projectPda,
      globals: globalsPda,
      authority: wallet.publicKey,
      payer: payer.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([wallet, payer])
    .rpc();

  return projectPda;
};

export const updateAdmins = async (
  wallet: Keypair,
  payer: Keypair = wallet,
  program: Program<Befundr>,
  admins: PublicKey[]
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .updateAdmin(admins)
    .accountsPartial({
      config: globalsPda,
      authority: wallet.publicKey,
      payer: payer.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, wallet])
    .rpc();

  return globalsPda;
};

export const updateUsdcMint = async (
  wallet: Keypair,
  payer: Keypair = wallet,
  usdcMint: PublicKey,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .updateUsdcMint(usdcMint)
    .accountsPartial({
      config: globalsPda,
      authority: wallet.publicKey,
      payer: payer.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, wallet])
    .rpc();

  return globalsPda;
};

export const getPda = (
  seed: Array<Buffer | Uint8Array>,
  programId: PublicKey
) => {
  const [pdaPublicKey] = PublicKey.findProgramAddressSync(seed, programId);

  return pdaPublicKey;
};

export const approveProject = async (
  wallet: Keypair,
  projectPda: PublicKey,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .approveProject()
    .accountsPartial({
      globals: globalsPda,
      project: projectPda,
      authority: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([wallet])
    .rpc();

  return projectPda;
};

export const startNftMintRound = async (
  admin: Keypair,
  payer: Keypair = admin,
  projectPda: PublicKey,
  collection: Keypair,
  nftMaxSupply: BN,
  nftUsdcPrice: BN,
  nftCollectionName: string,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .startNftMintRound(nftMaxSupply, nftUsdcPrice, nftCollectionName)
    .accountsPartial({
      collection: collection.publicKey,
      project: projectPda,
      globals: globalsPda,
      mplCoreProgram: MPL_CORE_PROGRAM_ID,
      authority: admin.publicKey,
      payer: payer.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, admin])
    .rpc();

  return projectPda;
};

export const mintNft = async (
  user: Keypair,
  payer: Keypair = user,
  projectPda: PublicKey,
  usdcMint: PublicKey = MINT_ADDRESS,
  collection: PublicKey,
  asset: Keypair,
  fromAta: PublicKey,
  toAta: PublicKey,
  amount: number,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);
  const [nftAllocationPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(NFT_ALLOCATION_SEED),
      projectPda.toBuffer(),
      user.publicKey.toBuffer(),
    ],
    program.programId
  );

  await program.methods
    .mintNft(amount)
    .accountsPartial({
      project: projectPda,
      nftAllocation: nftAllocationPda,
      collection: collection,
      asset: asset.publicKey,
      mplCoreProgram: MPL_CORE_PROGRAM_ID,
      globals: globalsPda,
      authority: user.publicKey,
      payer: payer.publicKey,
      from: fromAta,
      to: toAta,
      usdcMint: usdcMint,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, user, asset])
    .rpc();

  return nftAllocationPda;
};

export const startIncubation = async (
  admin: Keypair,
  payer: Keypair = admin,
  projectPda: PublicKey,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .startIncubation()
    .accountsPartial({
      project: projectPda,
      globals: globalsPda,
      authority: admin.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, admin])
    .rpc();

  return projectPda;
};

export const startNftPresale = async (
  admin: Keypair,
  payer: Keypair = admin,
  tokenMint: PublicKey,
  projectAta: PublicKey,
  projectPda: PublicKey,
  maxSupply: BN,
  usdcPrice: BN,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .startNftPresale(maxSupply, usdcPrice)
    .accountsPartial({
      project: projectPda,
      globals: globalsPda,
      authority: admin.publicKey,
      mint: tokenMint,
      projectAta: projectAta,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, admin])
    .rpc();

  return projectPda;
};

export const startCommuPresale = async (
  admin: Keypair,
  payer: Keypair = admin,
  projectPda: PublicKey,
  maxSupply: BN,
  usdcPrice: BN,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .startCommuPresale(maxSupply, usdcPrice)
    .accountsPartial({
      project: projectPda,
      globals: globalsPda,
      authority: admin.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, admin])
    .rpc();

  return projectPda;
};

export const startPublicSale = async (
  admin: Keypair,
  payer: Keypair = admin,
  projectPda: PublicKey,
  maxSupply: BN,
  usdcPrice: BN,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .startPublicSale(maxSupply, usdcPrice)
    .accountsPartial({
      project: projectPda,
      globals: globalsPda,
      authority: admin.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer, admin])
    .rpc();

  return projectPda;
};

export const buyToken = async (
  user: Keypair,
  payer: Keypair = user,
  projectPda: PublicKey,
  preSaleNft: PublicKey | null,
  communityNft: PublicKey | null,
  usdcMint: PublicKey,
  projectTokenMint: PublicKey,
  buyerUsdcAta: PublicKey,
  sellerUsdcAta: PublicKey,
  buyerAta: PublicKey,
  projectAta: PublicKey,
  amount: BN,
  program: Program<Befundr>
): Promise<PublicKey> => {
  const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);

  await program.methods
    .buyToken(amount)
    .accountsPartial({
      buyer: user.publicKey,
      project: projectPda,
      preSaleNft: preSaleNft,
      communityNft: communityNft,
      globals: globalsPda,
      usdcMint: usdcMint,
      projectTokenMint: projectTokenMint,
      buyerUsdcAta: buyerUsdcAta,
      sellerUsdcAta: sellerUsdcAta,
      buyerAta: buyerAta,
      projectAta: projectAta,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .signers([payer])
    .rpc();

  return projectPda;
};

export const increaseClock = (client: LiteSVM, duration: bigint) => {
  const initialClock = client.getClock();
  initialClock.unixTimestamp += duration;
  client.setClock(initialClock);
  return initialClock.unixTimestamp;
};

export const forwardSlot = (client: LiteSVM, slotJump: bigint = 1n) => {
  const initialClock = client.getClock();
  initialClock.slot += slotJump;
  client.setClock(initialClock);
  return initialClock.slot;
};
