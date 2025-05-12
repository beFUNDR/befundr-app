use anchor_lang::prelude::*;

use crate::{
    errors::{AdminError, ProjectError},
    Globals, Project, ProjectStatus, GLOBALS_SEED, PROJECT_SEED,
};

pub fn approve_project(ctx: Context<ApproveProject>) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let globals = &ctx.accounts.globals;

    require!(
        globals.admins.contains(&ctx.accounts.authority.key()),
        AdminError::NotAllowed
    );

    require!(
        project.status == ProjectStatus::WaitingForApproval,
        ProjectError::WrongStatus
    );

    project.status = ProjectStatus::Published;
    Ok(())
}

#[derive(Accounts)]
pub struct ApproveProject<'info> {
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

    #[account()]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
