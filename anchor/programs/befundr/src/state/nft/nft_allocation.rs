use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct NftAllocation {
    pub initial_owner: Pubkey,
    pub project: Pubkey,
    pub purchased_nft_amount: u16,
}
impl NftAllocation {}
