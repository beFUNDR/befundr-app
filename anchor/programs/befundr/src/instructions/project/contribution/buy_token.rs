use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

use crate::{
    errors::{ContributionError, TransferError},
    Globals, Project, ProjectStatus, GLOBALS_SEED, PROJECT_SEED, PROJECT_TOKEN_DECIMALS,
};

pub fn buy_token(ctx: Context<BuyToken>, amount: u64) -> Result<()> {
    let project = &mut ctx.accounts.project;
    let token_price;

    match project.status {
        ProjectStatus::NftPresale => {
            require!(
                project.round_1_remaining_supply >= amount,
                ContributionError::NotEnoughSupply
            );
            project.round_1_remaining_supply -= amount;
            token_price = project.round_1_usdc_price;
        }
        ProjectStatus::CommuPresale => {
            require!(
                project.round_2_remaining_supply >= amount,
                ContributionError::NotEnoughSupply
            );
            project.round_2_remaining_supply -= amount;
            token_price = project.round_2_usdc_price;
        }
        ProjectStatus::PublicSale => {
            require!(
                project.round_3_remaining_supply >= amount,
                ContributionError::NotEnoughSupply
            );
            project.round_3_remaining_supply -= amount;
            token_price = project.round_3_usdc_price;
        }
        _ => {
            return Err(ContributionError::InvalidStatus.into());
        }
    }

    let cpi_accounts = Transfer {
        from: ctx.accounts.buyer_usdc_ata.to_account_info(),
        to: ctx.accounts.seller_usdc_ata.to_account_info(),
        authority: ctx.accounts.buyer.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);

    let usdc_transfer_amount = amount.checked_mul(token_price).unwrap();
    token::transfer(cpi_context, usdc_transfer_amount)?;

    project.usdc_balance = project
        .usdc_balance
        .checked_add(usdc_transfer_amount)
        .unwrap();

    let seeds: &[&[u8]] = &[
        PROJECT_SEED,
        &project.project_counter.to_le_bytes(),
        &[ctx.bumps.project],
    ];
    let signer_seeds = &[&seeds[..]];

    let cpi_accounts = Transfer {
        from: ctx.accounts.project_ata.to_account_info(),
        to: ctx.accounts.buyer_ata.to_account_info(),
        authority: project.to_account_info(),
    };

    let cpi_context = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        cpi_accounts,
        signer_seeds,
    );

    token::transfer(cpi_context, amount)?;

    Ok(())
}

#[derive(Accounts)]
pub struct BuyToken<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut,
        seeds = [PROJECT_SEED, &project.project_counter.to_le_bytes()],
        bump
    )]
    pub project: Account<'info, Project>,

    #[account()]
    pub pre_sale_nft: Option<Account<'info, TokenAccount>>,

    #[account()]
    pub community_nft: Option<Account<'info, TokenAccount>>,

    #[account(
        seeds = [GLOBALS_SEED],
        bump,
    )]
    pub globals: Account<'info, Globals>,

    #[account(constraint = usdc_mint.key() == globals.usdc_mint @ TransferError::InvalidTokenMint)]
    pub usdc_mint: Account<'info, Mint>,

    #[account(
        mint::decimals = PROJECT_TOKEN_DECIMALS,
        constraint = project_token_mint.key() == project.token_mint @ TransferError::InvalidTokenMint,
    )]
    pub project_token_mint: Account<'info, Mint>,

    #[account(mut,
        associated_token::mint = globals.usdc_mint,
        associated_token::authority = buyer,
    )]
    pub buyer_usdc_ata: Account<'info, TokenAccount>,

    #[account(mut,
        associated_token::mint = globals.usdc_mint,
        associated_token::authority = project,
    )]
    pub seller_usdc_ata: Account<'info, TokenAccount>,

    #[account(mut,
        associated_token::mint = project_token_mint,
        associated_token::authority = buyer,
    )]
    pub buyer_ata: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = project_token_mint,
        associated_token::authority = project,
    )]
    pub project_ata: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
