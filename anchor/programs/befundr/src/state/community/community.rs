use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Community {
    #[max_len(3)]
    pub communities: Vec<Pubkey>,
}
impl Community {}
