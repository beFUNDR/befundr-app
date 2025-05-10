#![allow(unexpected_cfgs)]

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
use instructions::*;
pub use state::*;

declare_id!("4j8u5cBA8adyNphcDWnUWdK3kiSFez7qg25Js3oaRaCX");

#[program]
pub mod befundr {
    use super::*;

    pub fn create_project(ctx: Context<CreateProject>, metadata_uri: String) -> Result<()> {
        instructions::create_project(ctx, metadata_uri)
    }

    pub fn approve_project(ctx: Context<ApproveProject>) -> Result<()> {
        instructions::approve_project(ctx)
    }

    pub fn start_nft_mint_round(
        ctx: Context<StartNftMintRound>,
        nft_max_supply: u64,
        nft_usdc_price: u64,
        nft_collection_name: String,
    ) -> Result<()> {
        instructions::start_nft_mint_round(ctx, nft_max_supply, nft_usdc_price, nft_collection_name)
    }

    pub fn update_usdc_mint(ctx: Context<UpdateUsdcMint>, new_usdc_mint: Pubkey) -> Result<()> {
        instructions::update_usdc_mint(ctx, new_usdc_mint)
    }

    pub fn update_admin(ctx: Context<UpdateAdmins>, admins: Vec<Pubkey>) -> Result<()> {
        instructions::update_admins(ctx, admins)
    }
}
