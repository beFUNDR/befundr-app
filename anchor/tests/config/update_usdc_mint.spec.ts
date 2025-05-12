import { BN } from 'bn.js';
import { createUserWalletWithSol, updateAdmins, updateUsdcMint } from '../utils/testUtils';
import { Provider, Program } from '@coral-xyz/anchor';
import { fromWorkspace, LiteSVMProvider } from 'anchor-litesvm';
import { LiteSVM } from 'litesvm';
import { Befundr } from '../../target/types/befundr';
import BefundrIDL from '../../target/idl/befundr.json';
import { Keypair, PublicKey } from '@solana/web3.js';
import { initMint, MINT_ADDRESS } from 'tests/utils/tokenUtils';
import { MPL_CORE_PROGRAM_ID } from '@metaplex-foundation/mpl-core';

describe('update_usdc_mint', () => {
    let provider: Provider;
    let program: Program<Befundr>;
    let client: LiteSVM;
    let adminWallet: Keypair;
    let userWallet: Keypair;
    let payerWallet: Keypair;

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

    describe('Success Cases', () => {
        it('should successfully update admins list', async () => {
            const adminWallet = await createUserWalletWithSol(client);

            const globalsPda = await updateUsdcMint(adminWallet, adminWallet, MINT_ADDRESS, program);

            const globals = await program.account.globals.fetch(globalsPda);

            expect(globals.createdProjectCounter.eq(new BN(0))).toBe(true);
            expect(globals.usdcMint).toEqual(MINT_ADDRESS);
        });
    });
});