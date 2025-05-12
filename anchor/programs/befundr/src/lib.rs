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

    pub fn mint_nft(ctx: Context<MintNft>, quantity: u16) -> Result<()> {
        instructions::mint_nft(ctx, quantity)
    }

    pub fn start_incubation(ctx: Context<StartIncubation>) -> Result<()> {
        instructions::start_incubation(ctx)
    }

    pub fn start_nft_presale(
        ctx: Context<StartNftPresale>,
        round_1_max_supply: u64,
        round_1_usdc_price: u64,
    ) -> Result<()> {
        instructions::start_nft_presale(ctx, round_1_max_supply, round_1_usdc_price)
    }

    pub fn start_commu_presale(
        ctx: Context<StartCommuPresale>,
        round_2_max_supply: u64,
        round_2_usdc_price: u64,
    ) -> Result<()> {
        instructions::start_commu_presale(ctx, round_2_max_supply, round_2_usdc_price)
    }
    pub fn start_public_sale(
        ctx: Context<StartPublicSale>,
        round_3_max_supply: u64,
        round_3_usdc_price: u64,
    ) -> Result<()> {
        instructions::start_public_sale(ctx, round_3_max_supply, round_3_usdc_price)
    }

    pub fn buy_token(ctx: Context<BuyToken>, amount: u64) -> Result<()> {
        instructions::buy_token(ctx, amount)
    }

    pub fn update_usdc_mint(ctx: Context<UpdateUsdcMint>, new_usdc_mint: Pubkey) -> Result<()> {
        instructions::update_usdc_mint(ctx, new_usdc_mint)
    }

    pub fn update_admin(ctx: Context<UpdateAdmins>, admins: Vec<Pubkey>) -> Result<()> {
        instructions::update_admins(ctx, admins)
    }
}
