use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};
use mpl_token_metadata::instruction::create_metadata_accounts_v3;
use mpl_token_metadata::ID as METADATA_PROGRAM_ID;

pub fn create_token_with_metadata(
    ctx: Context<CreateTokenWithMetadata>,
    name: String,
    symbol: String,
    uri: String,
    total_supply: u64,
) -> Result<()> {
    // Mint tokens to the associated token account
    let cpi_accounts = MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.mint_authority.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
    token::mint_to(cpi_ctx, total_supply)?;

    // Create metadata account
    let metadata_accounts = vec![
        ctx.accounts.metadata_program.to_account_info(),
        ctx.accounts.metadata.to_account_info(),
        ctx.accounts.mint.to_account_info(),
        ctx.accounts.mint_authority.to_account_info(),
        ctx.accounts.payer.to_account_info(),
        ctx.accounts.payer.to_account_info(),
        ctx.accounts.system_program.to_account_info(),
        ctx.accounts.rent.to_account_info(),
    ];

    let create_metadata_ix = create_metadata_accounts_v3(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.mint.key(),
        ctx.accounts.mint_authority.key(),
        ctx.accounts.payer.key(),
        ctx.accounts.payer.key(),
        name,
        symbol,
        uri,
        None,
        0,
        true,
        false,
        None,
        None,
        None,
    );

    anchor_lang::solana_program::program::invoke(&create_metadata_ix, &metadata_accounts)?;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateTokenWithMetadata<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        payer = payer,
        mint::decimals = 6,
        mint::authority = mint_authority,
        mint::freeze_authority = mint_authority
    )]
    pub mint: Account<'info, Mint>,

    /// CHECK: This is a PDA derived elsewhere
    pub mint_authority: UncheckedAccount<'info>,

    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = payer
    )]
    pub token_account: Account<'info, TokenAccount>,

    /// CHECK: Metaplex metadata account
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,

    /// CHECK: Metaplex Token Metadata program
    #[account(address = METADATA_PROGRAM_ID)]
    pub metadata_program: UncheckedAccount<'info>,
}
