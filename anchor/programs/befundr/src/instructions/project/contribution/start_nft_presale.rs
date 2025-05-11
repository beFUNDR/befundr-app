use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::{
    errors::{AdminError, ProjectError, TokenError},
    Globals, Project, ProjectStatus, GLOBALS_SEED, PROJECT_SEED, PROJECT_TOKEN_DECIMALS,
};

pub fn start_nft_presale(
    ctx: Context<StartNftPresale>,
    round_1_max_supply: u64,
    round_1_usdc_price: u64,
) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let globals = &mut ctx.accounts.globals;
    let mint = &mut ctx.accounts.mint;

    require!(
        globals.admins.contains(&ctx.accounts.authority.key()),
        AdminError::NotAllowed
    );

    require!(
        mint.mint_authority == None.into(),
        TokenError::AuthorityActive
    );

    require!(
        project.status == ProjectStatus::Incubation,
        ProjectError::WrongStatus
    );

    require!(mint.mint_authority.is_none(), TokenError::AuthorityActive);

    require!(
        mint.freeze_authority.is_none(),
        TokenError::FreezeAuthorityActive
    );

    project.round_1_max_supply = round_1_max_supply;
    project.round_1_remaining_supply = round_1_max_supply;
    project.round_1_usdc_price = round_1_usdc_price;

    project.status = ProjectStatus::NftPresale;
    project.token_mint = mint.key();

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

    #[account(
        mint::decimals = PROJECT_TOKEN_DECIMALS,
    )]
    pub mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = project,
        constraint = project_ata.amount == mint.supply @ TokenError::WrongTokenAuthority,
    )]
    pub project_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
