use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]

pub struct Project {
    pub owner: Pubkey,
    pub nft_max_supply: u64,
    pub minted_nft: u64,
    pub nft_usdc_price: u64,
    pub nft_collection: Pubkey,
    pub token_mint: Pubkey,

    // Round 1
    pub round_1_max_supply: u64,
    pub round_1_remaining_supply: u64,
    pub round_1_usdc_price: u64,

    // Round 2
    pub round_2_max_supply: u64,
    pub round_2_remaining_supply: u64,
    pub round_2_usdc_price: u64,

    // Round 3
    pub round_3_max_supply: u64,
    pub round_3_remaining_supply: u64,
    pub round_3_usdc_price: u64,

    pub usdc_balance: u64,

    pub status: ProjectStatus,

    #[max_len(200)]
    pub metadata_uri: String,

    pub project_counter: u64,
}

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize, Eq, PartialEq)]
pub enum ProjectStatus {
    WaitingForApproval,
    Published,
    NftMintRound,
    Incubation,
    NftPresale,
    CommuPresale,
    PublicSale,
    Live,
    Failed,
}
