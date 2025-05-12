import { BN } from 'bn.js';
import { createUserWalletWithSol, updateAdmins } from '../utils/testUtils';
import { Provider, Program } from '@coral-xyz/anchor';
import { fromWorkspace, LiteSVMProvider } from 'anchor-litesvm';
import { LiteSVM } from 'litesvm';
import { Befundr } from '../../target/types/befundr';
import BefundrIDL from '../../target/idl/befundr.json';

describe('update_admins', () => {
    let provider: Provider;
    let program: Program<Befundr>;
    let client: LiteSVM;

    beforeEach(async () => {
        client = fromWorkspace("");

        provider = new LiteSVMProvider(client);
        program = new Program<Befundr>(BefundrIDL as Befundr, provider);
    });

    describe('Success Cases', () => {
        it('should successfully update admins list', async () => {
            const adminWallet = await createUserWalletWithSol(client);
            const admins = [adminWallet.publicKey];
            const globalsPda = await updateAdmins(adminWallet, adminWallet, program, admins);

            const globals = await program.account.globals.fetch(globalsPda);

            expect(globals.admins).toEqual(admins);
            expect(globals.createdProjectCounter.eq(new BN(0))).toBe(true);
        });
    });
});