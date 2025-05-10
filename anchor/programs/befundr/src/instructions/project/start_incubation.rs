use anchor_lang::prelude::*;

use crate::{
    errors::{AdminError, ProjectError},
    Globals, Project, ProjectStatus, GLOBALS_SEED, PROJECT_SEED,
};

pub fn start_incubation(ctx: Context<StartIncubation>) -> Result<()> {
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

    project.status = ProjectStatus::Incubation;
    Ok(())
}

#[derive(Accounts)]
pub struct StartIncubation<'info> {
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
