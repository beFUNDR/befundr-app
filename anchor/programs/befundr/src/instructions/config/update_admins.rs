use anchor_lang::prelude::*;

use crate::{errors::AdminError, Globals, GLOBALS_SEED};

pub fn update_admins(ctx: Context<UpdateAdmins>, admins: Vec<Pubkey>) -> Result<()> {
    let config = &mut ctx.accounts.config;

    require!(
        config.admins.len() == 0 || config.admins.contains(&ctx.accounts.authority.key()),
        AdminError::NotAllowed
    );

    config.admins = admins;

    Ok(())
}

#[derive(Accounts)]
pub struct UpdateAdmins<'info> {
    #[account(init_if_needed,
        payer = payer,
        space = 8 + Globals::INIT_SPACE,
         seeds = [GLOBALS_SEED], bump)]
    pub config: Account<'info, Globals>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
