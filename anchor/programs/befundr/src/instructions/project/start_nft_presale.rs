use anchor_lang::prelude::*;

use crate::{
    errors::{AdminError, ProjectError},
    Globals, Project, ProjectStatus, GLOBALS_SEED, PROJECT_SEED,
};

pub fn start_nft_presale(
    ctx: Context<StartNftPresale>,
    round_1_max_supply: u64,
    round_1_usdc_price: u64,
) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let globals = &mut ctx.accounts.globals;

    require!(
        globals.admins.contains(&ctx.accounts.authority.key()),
        AdminError::NotAllowed
    );

    require!(
        project.status == ProjectStatus::NftMintRound,
        ProjectError::WrongStatus
    );

    project.round_1_max_supply = round_1_max_supply;
    project.round_1_remaining_supply = round_1_max_supply;
    project.round_1_usdc_price = round_1_usdc_price;

    project.status = ProjectStatus::NftMintRound;
    Ok(())
}

#[derive(Accounts)]
pub struct StartNftPresale<'info> {
    #[account(
        seeds = [PROJECT_SEED, &project.project_counter.to_le_bytes()],
        bump,
    )]
    pub project: Account<'info, Project>,

    #[account(
        seeds = [GLOBALS_SEED],
        bump,
    )]
    pub globals: Account<'info, Globals>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
