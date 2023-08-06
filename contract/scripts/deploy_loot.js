const hre = require("hardhat");
//import { ethers } from "hardhat";

async function main() {

  const LootAdventure = await ethers.getContractFactory("LootAdventure");
  const lootAdventure = await LootAdventure.deploy();
  await lootAdventure.deployed();
  console.log("itemNFT contract deployed at:", lootAdventure.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});