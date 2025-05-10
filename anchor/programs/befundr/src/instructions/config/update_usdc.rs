use anchor_lang::prelude::*;

use crate::{errors::AdminError, Globals, GLOBALS_SEED};

pub fn update_usdc_mint(ctx: Context<UpdateUsdcMint>, new_usdc_mint: Pubkey) -> Result<()> {
    let config = &mut ctx.accounts.config;

    require!(
        config.admins.contains(&ctx.accounts.authority.key()),
        AdminError::NotAllowed
    );

    config.usdc_mint = new_usdc_mint;

    Ok(())
}

#[derive(Accounts)]
pub struct UpdateUsdcMint<'info> {
    #[account(mut, seeds = [GLOBALS_SEED], bump)]
    pub config: Account<'info, Globals>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
