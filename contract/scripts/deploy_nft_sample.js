const hre = require("hardhat");
//import { ethers } from "hardhat";

async function main() {

  const ItemNFT = await ethers.getContractFactory("SampleNft");
  const itemNFT = await ItemNFT.deploy();
  await itemNFT.deployed();
  console.log("SampleNft contract deployed at:", itemNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});