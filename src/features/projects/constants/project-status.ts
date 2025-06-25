export enum ProjectStatus {
  WaitingForApproval = "WaitingForApproval",
  Published = "Published",
  NftMintRound = "NftMintRound",
  Incubation = "Incubation",
  NftPresale = "NftPresale",
  CommuPresale = "CommuPresale",
  PublicSale = "PublicSale",
  Live = "Live",
  Abandoned = "Abandoned",
}

export type ProjectStep = {
  key: ProjectStatus;
  label: string;
  nextAction?: string;
};

export const projectSteps: ProjectStep[] = [
  {
    key: ProjectStatus.WaitingForApproval,
    label: "Waiting for approval",
    nextAction: "Approve",
  },
  {
    key: ProjectStatus.Published,
    label: "Published",
    nextAction: "Start NFT mint round",
  },
  {
    key: ProjectStatus.NftMintRound,
    label: "NFT mint round",
    nextAction: "Start incubation",
  },
  {
    key: ProjectStatus.Incubation,
    label: "Incubation",
    nextAction: "Start NFT presale",
  },
  {
    key: ProjectStatus.NftPresale,
    label: "NFT presale",
    nextAction: "Start community presale",
  },
  {
    key: ProjectStatus.CommuPresale,
    label: "Community presale",
    nextAction: "Start public sale",
  },
  {
    key: ProjectStatus.PublicSale,
    label: "Public sale",
    nextAction: "Start live",
  },
  { key: ProjectStatus.Live, label: "Live" },
];
