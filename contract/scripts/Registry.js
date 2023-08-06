const hre = require("hardhat");
const { ethers } = require('hardhat');
// importing the json file from ../deployments/buildbear/MainContract.json
const NFTAddress = "0x923c69439423eC3d02693f792285e98B26EA126e";
//const NFTAddress = "0xcaD30e84e38597C1791B30DD41705eA3a16d7D0d";
//const RegistryAddress = "0x76381e79B2b00B898979CD74aCE8E1def8cba005";
const RegistryAddress = "0x9a513e5C611Bf76D5bC8001783Da8Ea2F3456115";
const ERC6551AccountAddress = "0xB7E6939fEe5480b8858fB257D6Ac19f801E60aBE";
//const ERC6551AccountAddress = "0xB7E6939fEe5480b8858fB257D6Ac19f801E60aBE";

async function main() {
    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    //const NFT = await hre.ethers.getContractAt("NFT", NFTAddress);
    const Registry = await hre.ethers.getContractAt("ERC6551Registryv2", RegistryAddress);
    const ERC6551Account = await hre.ethers.getContractAt("ERC6551Account", ERC6551AccountAddress);
    /*
    // nft mint
    console.log("Minting NFT");
    const mint = await NFT.safeMint(deployer.address, "https://ipfs//CID");
    console.log("Minting NFT Successfuly");
    */
    //Should create TokenBoundAccount successfuly
    console.log("Creating a TokenBoundAccount using NFT");
    await Registry.setLootAdventure("0x8D9460F872B8075Fe2A7EB5a0924e4dA1655520e");
    console.log("Setting Success!!!");
    const newAccount = await Registry.callStatic.createAccount(
        ERC6551Account.address, // implementation contract
        420, //  chainId
        NFTAddress, // parent NFT
        8, // token ID
        1, // salt
        "0x" // init calldata
    );
    console.log("TokenBoundAccount Created Address:", newAccount);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
