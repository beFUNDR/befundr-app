use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Globals {
    pub fees: u64,
    pub usdc_mint: Pubkey,
    pub created_project_counter: u64,

    #[max_len(3)]
    pub admins: Vec<Pubkey>,
}

impl Globals {}
