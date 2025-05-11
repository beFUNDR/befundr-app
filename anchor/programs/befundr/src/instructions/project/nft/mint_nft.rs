use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use mpl_core::{
    accounts::BaseCollectionV1,
    instructions::CreateV2CpiBuilder,
    ID as MPL_CORE_PROGRAM_ID,
};

use crate::{
    errors::{NftError, ProjectError, TransferError}, Globals, NftAllocation, Project, ProjectStatus, GLOBALS_SEED, MAX_NFT_PER_KEY, NFT_ALLOCATION_SEED, PROJECT_SEED
};

pub fn mint_nft(
    ctx: Context<MintNft>,
    quantity: u16
) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let collection = &mut ctx.accounts.collection;
    let nft_allocation = &mut ctx.accounts.nft_allocation;

    require!(
        project.status == ProjectStatus::NftPresale,
        ProjectError::WrongStatus
    );

    require!(quantity + nft_allocation.purchased_nft_amount <= MAX_NFT_PER_KEY, NftError::UserMintLimitReached);

    let cpi_accounts = Transfer {
        from: ctx.accounts.from.to_account_info(),
        to: ctx.accounts.to.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };

    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);

    let total_price = project.nft_usdc_price.saturating_mul(quantity as u64);
    token::transfer(cpi_ctx, total_price)?;

    let seeds: &[&[u8]] = &[PROJECT_SEED, &[ctx.bumps.project]];
    let signer_seeds = &[&seeds[..]];

    CreateV2CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
        .asset(&ctx.accounts.asset.to_account_info())
        .collection(Some(&collection.to_account_info()))
        .payer(&ctx.accounts.payer.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .owner(Some(&ctx.accounts.authority.to_account_info()))
        .name(collection.name.to_string())
        .uri(collection.uri.to_string())
        .invoke_signed(signer_seeds)?;


    Ok(())
}

#[derive(Accounts)]
pub struct MintNft<'info> {
    #[account(
        seeds = [PROJECT_SEED, &project.project_counter.to_le_bytes()],
        bump,
    )]
    pub project: Account<'info, Project>,

        #[account(
        init_if_needed,
        seeds = [NFT_ALLOCATION_SEED.as_ref(), project.key().as_ref(), authority.key().as_ref()],
        bump,
        payer = payer,
        space = 8 + NftAllocation::INIT_SPACE 
    )]
    pub nft_allocation: Account<'info, NftAllocation>,

    #[account(mut,
        constraint = collection.key() == project.nft_collection @ NftError::WrongCollection)]
    pub collection: Account<'info, BaseCollectionV1>,

    #[account(mut)]
    pub asset: Signer<'info>,

    #[account(address = MPL_CORE_PROGRAM_ID)]
    /// CHECK: This doesn't need to be checked, because there is the address constraint
    pub mpl_core_program: UncheckedAccount<'info>,

    #[account(
        seeds = [GLOBALS_SEED],
        bump,
    )]
    pub globals: Account<'info, Globals>,

    #[account()]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        mut,
        associated_token::mint = globals.usdc_mint,
        associated_token::authority = authority,
    )]
    pub from: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = globals.usdc_mint,
        associated_token::authority = globals,
    )]
    pub to: Account<'info, TokenAccount>,

    #[account(constraint = usdc_mint.key() == globals.usdc_mint @ TransferError::InvalidTokenMint)]
    pub usdc_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
