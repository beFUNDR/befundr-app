use anchor_lang::prelude::*;

use crate::{
    errors::{AdminError, ProjectError},
    Globals, Project, ProjectStatus, GLOBALS_SEED, PROJECT_SEED,
};

pub fn start_commu_presale(
    ctx: Context<StartCommuPresale>,
    round_2_max_supply: u64,
    round_2_usdc_price: u64,
) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let globals = &mut ctx.accounts.globals;

    require!(
        globals.admins.contains(&ctx.accounts.authority.key()),
        AdminError::NotAllowed
    );

    require!(
        project.status == ProjectStatus::NftPresale,
        ProjectError::WrongStatus
    );

    project.round_2_max_supply = round_2_max_supply;
    project.round_2_remaining_supply = round_2_max_supply;
    project.round_2_usdc_price = round_2_usdc_price;

    project.status = ProjectStatus::CommuPresale;
    Ok(())
}

#[derive(Accounts)]
pub struct StartCommuPresale<'info> {
    #[account(mut, 
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
