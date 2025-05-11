use anchor_lang::prelude::*;

#[constant]
pub const PROJECT_SEED: &[u8; 7] = b"project";

#[constant]
pub const GLOBALS_SEED: &[u8; 7] = b"globals";

#[constant]
pub const TOKEN_ALLOCATION_SEED: &[u8; 16] = b"token_allocation";

#[constant]
pub const NFT_ALLOCATION_SEED: &[u8; 14] = b"nft_allocation";

#[constant]
pub const MAX_NFT_PER_KEY: u16 = 4;

#[constant]
pub const PROJECT_TOKEN_DECIMALS: u8 = 6;
