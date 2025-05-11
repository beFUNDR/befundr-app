use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct TokenAllocation {
    pub nft: Pubkey,
    pub project: Pubkey,
    pub nft_supply: u16,
}
impl TokenAllocation {}
