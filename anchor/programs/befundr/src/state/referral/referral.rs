use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Referral {
    pub creator: Pubkey,
    pub referral_nft: Pubkey,
    pub parent_referral_nft: Option<Pubkey>,
    pub balance: u64,
    pub balance_claimed: u64,
    pub referral_code: [u8; 10],
    pub referral_count: u64,
}

impl Referral {}
