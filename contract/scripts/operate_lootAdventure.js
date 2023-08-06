const hre = require("hardhat");
const { ethers } = require('hardhat');

const mchcAddress = "0x1F0151AD2169982f3e2F275a2737580FAC9a69DF";
const itemNftAddress = "0x07bE24aeFDC9188a889E5BfA42758B26AC6e081F";

async function main() {
    const [deployer, account2] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const Loot = await hre.ethers.getContractAt("LootAdventure", "0x8D9460F872B8075Fe2A7EB5a0924e4dA1655520e");
    await Loot.setItemNftAddress(itemNftAddress);
    await Loot.setMchAddress(mchcAddress);

    console.log("Atack!!!!!!!!!!!");
    await Loot.createAvatar("0xA9EC2D906ED9B0C5398082Af113292ceC6895b49");
    const attack = await Loot.getAvatarAttack("0xA9EC2D906ED9B0C5398082Af113292ceC6895b49")

    console.log(attack);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
