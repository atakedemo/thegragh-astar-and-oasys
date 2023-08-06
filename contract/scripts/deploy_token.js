const hre = require("hardhat");
//import { ethers } from "hardhat";

async function main() {
  const MCHC = await ethers.getContractFactory("MCHC");
  const mchc = await MCHC.deploy();
  await mchc.deployed();
  console.log("mchc contract deployed at:", mchc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});