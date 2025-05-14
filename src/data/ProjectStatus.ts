export enum ProjectStatus {
    WaitingForApproval = "WaitingForApproval",
    Published = "Published",
    NftMintRound = "NftMintRound",
    Incubation = "Incubation",
    NftPresale = "NftPresale",
    CommuPresale = "CommuPresale",
    PublicSale = "PublicSale",
    Live = "Live",
}

export type ProjectStep = {
    key: ProjectStatus;
    label: string;
    nextAction?: string;
};

export const projectSteps: ProjectStep[] = [
    { key: ProjectStatus.WaitingForApproval, label: "Waiting For Approval", nextAction: "Approve" },
    { key: ProjectStatus.Published, label: "Published", nextAction: "Start NFT Mint Round" },
    { key: ProjectStatus.NftMintRound, label: "NFT Mint Round", nextAction: "Start Incubation" },
    { key: ProjectStatus.Incubation, label: "Incubation", nextAction: "Start NFT Presale" },
    { key: ProjectStatus.NftPresale, label: "NFT Presale", nextAction: "Start Community Presale" },
    { key: ProjectStatus.CommuPresale, label: "Community Presale", nextAction: "Start Public Sale" },
    { key: ProjectStatus.PublicSale, label: "Public Sale", nextAction: "Start Live" },
    { key: ProjectStatus.Live, label: "Live" },
];