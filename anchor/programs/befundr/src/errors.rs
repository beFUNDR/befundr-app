use anchor_lang::prelude::*;

#[error_code]
pub enum AdminError {
    #[msg("The signer is not the authority")]
    NotAuthority,
    #[msg("The signer is not allowed")]
    NotAllowed,
}

#[error_code]
pub enum NftError {
    #[msg("Invalid authority for the given collection")]
    WrongCollectionAuthority,
    #[msg("Invalid collection for the mint")]
    WrongCollection,
    #[msg("Mint limit reached for the given authority")]
    UserMintLimitReached,
    #[msg("Not enough NFTs remaining")]
    NotEnoughSupply,
    #[msg("NFT collection is sold out")]
    NftSoldOut,
}

#[error_code]
pub enum ContributionError {
    #[msg("The project is not in a sale status")]
    InvalidStatus,
    #[msg("The project token supply is insufficient")]
    NotEnoughSupply,
}

#[error_code]
pub enum TokenError {
    #[msg("Invalid authority for the given token mint")]
    WrongTokenAuthority,
    #[msg("The token authority is not revoked")]
    AuthorityActive,
    #[msg("The token freeze authority is not revoked")]
    FreezeAuthorityActive,
    #[msg("The supply is not complete")]
    NotAllSupply,
}

#[error_code]
pub enum ProjectError {
    #[msg("Current status does not allow this action")]
    WrongStatus,
}

#[error_code]
pub enum WithdrawError {
    #[msg("User balance lower than the requested amount")]
    InsuficientBalance,
    #[msg("The requested amount is too high")]
    AmountTooHigh,
}

#[error_code]
pub enum TransferError {
    #[msg("The token mint is invalid")]
    InvalidTokenMint,
}
