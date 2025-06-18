import {
  approveProject,
  createProject,
  createUserWalletWithSol,
  getPda,
  updateAdmins,
} from "@/utils/testUtils";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Provider, Program } from "@coral-xyz/anchor";
import { fromWorkspace, LiteSVMProvider } from "anchor-litesvm";
import { LiteSVM } from "litesvm";
import { Befundr } from "@/target/types/befundr";
import BefundrIDL from "@/target/idl/befundr.json";
import { ProjectStatus } from "@/project_status";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";
import { initMint } from "tests/utils/tokenUtils";

describe("approve_project", () => {
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
    await updateAdmins(adminWallet, adminWallet, program, [
      adminWallet.publicKey,
    ]);
    client.addProgramFromFile(
      new PublicKey(MPL_CORE_PROGRAM_ID),
      "tests/mpl-core/core.so"
    );
  });

  describe("success cases", () => {
    it("successfully approve a project", async () => {
      let userWallet = await createUserWalletWithSol(client);
      const metadataUri = "";
      const projectPda = await createProject(
        userWallet,
        userWallet,
        metadataUri,
        program
      );
      await approveProject(adminWallet, projectPda, program);

      const project = await program.account.project.fetch(projectPda);

      expect(new ProjectStatus(project.status).enum).toEqual(
        ProjectStatus.Published.enum
      );
    });
  });
});
