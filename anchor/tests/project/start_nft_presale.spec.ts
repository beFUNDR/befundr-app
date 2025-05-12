import { BN } from 'bn.js';
import { approveProject, createProject, createUserWalletWithSol, startNftMintRound, startNftPresale, updateAdmins } from '../utils/testUtils';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Provider, Program } from '@coral-xyz/anchor';
import { fromWorkspace, LiteSVMProvider } from 'anchor-litesvm';
import { LiteSVM } from 'litesvm';
import { Befundr } from '../../target/types/befundr';
import BefundrIDL from '../../target/idl/befundr.json';
import { MPL_CORE_PROGRAM_ID } from '@metaplex-foundation/mpl-core';
import { convertAmountToDecimals, getOrCreateATA, initMint, MINT_ADDRESS } from 'tests/utils/tokenUtils';
import { mintNft, startIncubation } from 'tests/utils/testUtils';
import { ProjectStatus } from './project_status';

describe('start_nft_presale', () => {
    let provider: Provider;
    let program: Program<Befundr>;
    let client: LiteSVM;
    let adminWallet: Keypair;
    let userWallet: Keypair;
    let payerWallet: Keypair;
    let userPda: PublicKey;
    let userAta: PublicKey;
    let globalsAta: PublicKey;
    let payerAta: PublicKey;

    beforeEach(async () => {
        client = fromWorkspace("");

        provider = new LiteSVMProvider(client);
        program = new Program<Befundr>(BefundrIDL as Befundr, provider);
        initMint(client);
        adminWallet = await createUserWalletWithSol(client);
        userWallet = await createUserWalletWithSol(client);
        payerWallet = await createUserWalletWithSol(client);
        const globalsPda = await updateAdmins(adminWallet, adminWallet, program, [adminWallet.publicKey]);
        client.addProgramFromFile(new PublicKey(MPL_CORE_PROGRAM_ID), "tests/mpl-core/core.so");
        userAta = await getOrCreateATA(client, userWallet.publicKey);
        globalsAta = await getOrCreateATA(client, globalsPda);

    });

    describe("success cases", () => {
        it("successfully start the incubation round of a project", async () => {
            let userWallet = await createUserWalletWithSol(client);
            const metadataUri = "";
            const collection = new Keypair();
            const asset = new Keypair();
            const nftMaxSupply = new BN(200);
            const nftUsdcPrice = convertAmountToDecimals(100);
            const nftCollectionName = "Nft collection project #1";
            const mintAmount = 1;

            const projectPda = await createProject(userWallet, userWallet, metadataUri, program);
            await approveProject(adminWallet, projectPda, program);
            await startNftMintRound(adminWallet, payerWallet, projectPda, collection, nftMaxSupply,
                nftUsdcPrice, nftCollectionName, program);

            await mintNft(userWallet, payerWallet, projectPda, MINT_ADDRESS, collection.publicKey, asset, userAta, globalsAta, mintAmount, program);
            await startIncubation(userWallet, payerWallet, projectPda, program);

            let projectTokenMint: PublicKey = PublicKey.unique();
            client.setAccount(projectTokenMint, {
                lamports: 0,
                data: Buffer.from("AQAAAJj+huiNm+Lqi8HMpIeLKYjCQPUrhCS/tA7Rot3LXhmbSPXZXjEPJQAGAQEAAABicKqKWcWUBbRShshncubNEm6bil06OFNtN/e0FOi2Zw==", 'base64'),
                owner: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                executable: false,
                rentEpoch: 18446744073,
            });
            const projectAta = await getOrCreateATA(client, projectTokenMint);

            const tokenMaxSupply = convertAmountToDecimals(100);
            const tokenUsdcPrice = convertAmountToDecimals(12);
            await startNftPresale(userWallet, payerWallet, projectTokenMint, projectAta, projectPda, tokenMaxSupply, tokenUsdcPrice, program);

            const project = await program.account.project.fetch(projectPda);

            expect(project.mintedNft.eq(new BN(mintAmount))).toBe(true);
            expect(new ProjectStatus(project.status).enum).toEqual(ProjectStatus.Incubation.enum);
        });
    });
});


