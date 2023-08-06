const hre = require("hardhat");
const { ethers } = require('hardhat');
const LootNFTAddress = "0x923c69439423eC3d02693f792285e98B26EA126e";
const ItemNFTAddress = "0xadf712D87149F6c05258D72A670557f7fb2bE856";
const RegistryAddress = "0x76381e79B2b00B898979CD74aCE8E1def8cba005";
const ERC6551AccountAddress = "0xB7E6939fEe5480b8858fB257D6Ac19f801E60aBE";

async function main() {
    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    //const LootNFT = await hre.ethers.getContractAt("LootNFT", LootNFTAddress);
    const ItemNFT = await hre.ethers.getContractAt("ItemNFT", ItemNFTAddress);
    const Registry = await hre.ethers.getContractAt("ERC6551Registry", RegistryAddress);
    const ERC6551Account = await hre.ethers.getContractAt("ERC6551Account", ERC6551AccountAddress);
    // nft mint
    console.log("Minting NFT");
    const mint = await ItemNFT.safeMint(deployer.address, "https://amber-pure-kite-450.mypinata.cloud/ipfs/QmXySQyrRpWP7keSd9yDTT5cdPhsphdrLqi5EcNJYyitMs/2.json");
    console.log("Minting NFT Successfuly");

    console.log("Transfer to TokenBoundAccount");
    const NewAccountaddress = await Registry.account(
        ERC6551Account.address, // implementation contract
        420, // chainId
        LootNFTAddress, // parent NFT
        8, // token ID
        1, // salt
    );

    // Transfer USDC tokens to the newly created account
    const transferTx = await ItemNFT.transferFrom(deployer.address, NewAccountaddress, 1);
    await transferTx.wait();
    console.log("ItemNft transferred successfully to TokenBoundAccount.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
