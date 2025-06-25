import { BN } from "bn.js";
import {
  createProject,
  createUserWalletWithSol,
  getPda,
} from "@/utils/testUtils";
import { PublicKey } from "@solana/web3.js";
import { Provider, Program } from "@coral-xyz/anchor";
import { fromWorkspace, LiteSVMProvider } from "anchor-litesvm";
import { LiteSVM } from "litesvm";
import { Befundr } from "@/target/types/befundr";
import BefundrIDL from "@/target/idl/befundr.json";
import { GLOBALS_SEED } from "tests/utils/constants";
import { ProjectStatus } from "@/project_status";

describe("create_project", () => {
  let provider: Provider;
  let program: Program<Befundr>;
  let client: LiteSVM;

  beforeEach(async () => {
    client = fromWorkspace("");

    provider = new LiteSVMProvider(client);
    program = new Program<Befundr>(BefundrIDL as Befundr, provider);
  });
  describe("success cases", () => {
    it("successfully create a project", async () => {
      let userWallet = await createUserWalletWithSol(client);
      const metadataUri = "";
      const globalsPda = getPda([Buffer.from(GLOBALS_SEED)], program.programId);
      const projectPda = await createProject(
        userWallet,
        userWallet,
        metadataUri,
        program
      );

      const project = await program.account.project.fetch(projectPda);
      const globals = await program.account.globals.fetch(globalsPda);

      expect(project.metadataUri).toEqual(metadataUri);
      expect(project.projectCounter).toEqual(userWallet.publicKey);
      expect(project.owner).toEqual(globals.createdProjectCounter);
      expect(new ProjectStatus(project.status).enum).toEqual(
        ProjectStatus.WaitingForApproval.enum
      );

      expect(globals.createdProjectCounter.eq(new BN(1))).toBe(true);
      expect(globals.admins.length).toEqual(1);
      expect(globals.admins[0].equals(userWallet.publicKey)).toBe(true);
    });
  });
});
