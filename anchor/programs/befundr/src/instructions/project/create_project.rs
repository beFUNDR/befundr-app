use anchor_lang::prelude::*;

use crate::{state::ProjectStatus, Globals, Project, GLOBALS_SEED, PROJECT_SEED};
pub fn create_project(
    ctx: Context<CreateProject>,
    metadata_uri: String,
) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let globals = &mut ctx.accounts.globals;

    project.owner = ctx.accounts.authority.key();

    project.usdc_balance = 0;
    project.status = ProjectStatus::WaitingForApproval;
    project.metadata_uri = metadata_uri;
    project.project_counter = globals.created_project_counter;
    globals.created_project_counter += 1;
    Ok(())
}

#[derive(Accounts)]
pub struct CreateProject<'info> {
    #[account(
        init,
        seeds = [PROJECT_SEED.as_ref(), &globals.created_project_counter.to_le_bytes()],
        bump,
        payer = payer,
        space = 8 + Project::INIT_SPACE 
    )]
    pub project: Account<'info, Project>,

    #[account(
        mut,
        seeds = [GLOBALS_SEED],
        bump,
    )]
    pub globals: Account<'info, Globals>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
