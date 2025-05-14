use anchor_lang::prelude::*;
use mpl_core::{instructions::CreateCollectionV2CpiBuilder, ID as MPL_CORE_PROGRAM_ID};

use crate::{
    errors::{AdminError, ProjectError},
    Globals, Project, ProjectStatus, GLOBALS_SEED, PROJECT_SEED,
};

pub fn start_nft_mint_round(
    ctx: Context<StartNftMintRound>,
    nft_max_supply: u64,
    nft_usdc_price: u64,
    nft_collection_name: String,
) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let globals = &ctx.accounts.globals;

    require!(
        globals.admins.contains(&ctx.accounts.authority.key()),
        AdminError::NotAllowed
    );

    require!(
        project.status == ProjectStatus::Published,
        ProjectError::WrongStatus
    );

    project.nft_max_supply = nft_max_supply;
    project.minted_nft = 0;
    project.nft_usdc_price = nft_usdc_price;

    let seeds: &[&[u8]] = &[PROJECT_SEED, &[ctx.bumps.project]];
    let signer_seeds = &[&seeds[..]];

    CreateCollectionV2CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
        .collection(&ctx.accounts.collection.to_account_info())
        .payer(&ctx.accounts.payer.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .name(format!("beFUNDR NFT - {}", nft_collection_name))
        .uri("https://example.com".to_string())
        .update_authority(Some(&project.to_account_info()))
        .invoke_signed(signer_seeds)?;

    project.nft_collection = ctx.accounts.collection.key();

    project.status = ProjectStatus::NftMintRound;
    Ok(())
}

#[derive(Accounts)]
pub struct StartNftMintRound<'info> {
    #[account(mut,
        seeds = [PROJECT_SEED, &project.project_counter.to_le_bytes()],
        bump,
    )]
    pub project: Account<'info, Project>,

    #[account(address = MPL_CORE_PROGRAM_ID)]
    /// CHECK: This doesn't need to be checked, because there is the address constraint
    pub mpl_core_program: UncheckedAccount<'info>,

    #[account(
        seeds = [GLOBALS_SEED],
        bump,
    )]
    pub globals: Account<'info, Globals>,

    #[account(mut)]
    pub collection: Signer<'info>,

    #[account()]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}
