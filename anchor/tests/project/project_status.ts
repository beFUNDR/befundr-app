import { Enum } from "@solana/web3.js";

type ProjectStatusType =
  | { waitingForApproval: string }
  | { published: string }
  | { nftMintRound: string }
  | { incubation: string }
  | { nftPresale: string }
  | { commuPresale: string }
  | { publicSale: string }
  | { live: string }
  | { failed: string };

export class ProjectStatus extends Enum {
  static WaitingForApproval = new ProjectStatus({
    waitingForApproval: "WaitingForApproval",
  });
  static Published = new ProjectStatus({ published: "Published" });
  static NftMintRound = new ProjectStatus({ nftMintRound: "NftMintRound" });
  static Incubation = new ProjectStatus({ incubation: "Incubation" });
  static NftPresale = new ProjectStatus({ nftPresale: "NftPresale" });
  static CommuPresale = new ProjectStatus({ commuPresale: "CommuPresale" });
  static PublicSale = new ProjectStatus({ publicSale: "PublicSale" });
  static Live = new ProjectStatus({ live: "Live" });
  static Failed = new ProjectStatus({ failed: "Failed" });
}
