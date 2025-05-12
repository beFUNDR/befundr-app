import { BN } from 'bn.js';
import { approveProject, createProject, createUserWalletWithSol, getPda, startNftMintRound, updateAdmins } from '../utils/testUtils';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Provider, Program } from '@coral-xyz/anchor';
import { fromWorkspace, LiteSVMProvider } from 'anchor-litesvm';
import { LiteSVM } from 'litesvm';
import { Befundr } from '../../target/types/befundr';
import BefundrIDL from '../../target/idl/befundr.json';
import { ProjectStatus } from './project_status';
import { MPL_CORE_PROGRAM_ID } from '@metaplex-foundation/mpl-core';
import { convertAmountToDecimals, initMint } from 'tests/utils/tokenUtils';

describe('start_nft_mint_round', () => {
    let provider: Provider;
    let program: Program<Befundr>;
    let client: LiteSVM;
    let adminWallet: Keypair;
    let userWallet: Keypair;
    let payerWallet: Keypair;
    let userPda: PublicKey;
    let userAta: PublicKey;
    let payerAta: PublicKey;

    beforeEach(async () => {
        client = fromWorkspace("");

        provider = new LiteSVMProvider(client);
        program = new Program<Befundr>(BefundrIDL as Befundr, provider);
        initMint(client);
        adminWallet = await createUserWalletWithSol(client);
        userWallet = await createUserWalletWithSol(client);
        payerWallet = await createUserWalletWithSol(client);
        await updateAdmins(adminWallet, adminWallet, program, [adminWallet.publicKey]);
        client.addProgramFromFile(new PublicKey(MPL_CORE_PROGRAM_ID), "tests/mpl-core/core.so");
    });

    describe("success cases", () => {
        it("successfully start the nft mint round of a project", async () => {
            let userWallet = await createUserWalletWithSol(client);
            const metadataUri = "";
            const collection = new Keypair();
            const nftMaxSupply = new BN(200);
            const nftUsdcPrice = convertAmountToDecimals(100);
            const nftCollectionName = "Nft collection project #1";

            const projectPda = await createProject(userWallet, userWallet, metadataUri, program);
            await approveProject(adminWallet, projectPda, program);
            await startNftMintRound(adminWallet, payerWallet, projectPda, collection, nftMaxSupply,
                nftUsdcPrice, nftCollectionName, program);

            const project = await program.account.project.fetch(projectPda);

            expect(new ProjectStatus(project.status).enum).toEqual(ProjectStatus.NftMintRound.enum);
            expect(project.nftCollection).toEqual(collection.publicKey);
            expect(project.nftMaxSupply.eq(nftMaxSupply)).toBe(true);
            expect(project.nftUsdcPrice.eq(nftUsdcPrice)).toBe(true);
            expect(project.mintedNft.eq(new BN(0))).toBe(true);
        });
    });
});


