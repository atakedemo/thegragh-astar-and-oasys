const hre = require("hardhat");
const { ethers } = require('hardhat');
const LootNFTAddress = "0x923c69439423eC3d02693f792285e98B26EA126e";
const TokenAddress = "0x1F0151AD2169982f3e2F275a2737580FAC9a69DF";
const RegistryAddress = "0x76381e79B2b00B898979CD74aCE8E1def8cba005";
const ERC6551AccountAddress = "0xB7E6939fEe5480b8858fB257D6Ac19f801E60aBE";

async function main() {
    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    //const LootNFT = await hre.ethers.getContractAt("LootNFT", LootNFTAddress);
    const MCHC = await hre.ethers.getContractAt("MCHC", TokenAddress);
    const Registry = await hre.ethers.getContractAt("ERC6551Registry", RegistryAddress);
    const ERC6551Account = await hre.ethers.getContractAt("ERC6551Account", ERC6551AccountAddress);

    console.log("MCHC Transfer to TokenBoundAccount");
    const NewAccountaddress = await Registry.account(
        ERC6551Account.address, // implementation contract
        420, // chainId
        LootNFTAddress, // parent NFT
        8, // token ID
        1, // salt
    );

    // Transfer USDC tokens to the newly created account
    const transferTx = await MCHC.transfer(NewAccountaddress, 1000000000000);
    await transferTx.wait();
    console.log("MCHC transferred successfully to TokenBoundAccount.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
