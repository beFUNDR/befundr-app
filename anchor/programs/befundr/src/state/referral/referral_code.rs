use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct ReferralCode {
    pub code: [u8; 10],
    pub referral_nft: Pubkey,
}

impl ReferralCode {}
