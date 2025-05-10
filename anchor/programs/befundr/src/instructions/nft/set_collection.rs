use crate::{errors::AdminError, Config, NftConfig, CONFIG_SEED, NFT_CONFIG_SEED};
use anchor_lang::prelude::*;
use mpl_core::{instructions::CreateCollectionV2CpiBuilder, ID as MPL_CORE_PROGRAM_ID};

pub fn set_collection(ctx: Context<SetCollection>) -> Result<()> {
    require!(
        ctx.accounts.authority.key() == ctx.accounts.config.admin,
        AdminError::NotAllowed
    );

    let seeds: &[&[u8]] = &[NFT_CONFIG_SEED, &[ctx.bumps.nft_config]];
    let signer_seeds = &[&seeds[..]];

    CreateCollectionV2CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
        .collection(&ctx.accounts.collection.to_account_info())
        .payer(&ctx.accounts.payer.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .name("beFUNDR NFT".to_string())
        .uri("https://example.com".to_string())
        .invoke_signed(signer_seeds)?;

    ctx.accounts.nft_config.collection = ctx.accounts.collection.key();
    Ok(())
}

#[derive(Accounts)]

pub struct SetCollection<'info> {
    #[account(seeds = [CONFIG_SEED],bump)]
    pub config: Account<'info, Config>,

    #[account( init_if_needed,
        payer = payer,
        space = 8 + NftConfig::INIT_SPACE,
        seeds = [NFT_CONFIG_SEED], bump)]
    pub nft_config: Account<'info, NftConfig>,

    #[account(address = MPL_CORE_PROGRAM_ID)]
    /// CHECK: This doesn't need to be checked, because there is the address constraint
    pub mpl_core_program: UncheckedAccount<'info>,

    #[account()]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut)]
    pub collection: Signer<'info>,

    pub system_program: Program<'info, System>,
}
