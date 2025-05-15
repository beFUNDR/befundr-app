To perform local tests, please run

solana-test-validator -r --bpf-program CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d mpl-core.so --bpf-program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA token-program.so

Ensure that you already have the programs .so in your directory 
Or fetch them from the mainnet using 
solana program dump -u m <program-address> <progam-name.so>
