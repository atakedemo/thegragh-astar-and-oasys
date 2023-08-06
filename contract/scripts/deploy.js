// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
//   If you user Astar, you must prepare the erc6551Registry contract
  ERC6551Registry = await ethers.getContractFactory("ERC6551Registryv2");
  erc6551Registry = await ERC6551Registry.deploy();
  await erc6551Registry.deployed();
  console.log("erc6551Registry contract deployed at:", erc6551Registry.address);
  /*
  TokenBoundAccount = await ethers.getContractFactory("ERC6551Account");
  tokenBoundAccount = await TokenBoundAccount.deploy();
  await tokenBoundAccount.deployed();
  console.log("tokenBoundAccount contract deployed at:", tokenBoundAccount.address);
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
