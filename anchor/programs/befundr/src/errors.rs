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
