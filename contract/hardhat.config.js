require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_URL_MCH = process.env.API_URL_MCH;
const API_URL_MUMBAI = process.env.API_URL_MUMBAI;
const API_KEY_MUMBAI = process.env.API_KEY_MUMBAI;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "mch",
  networks: {
    mch: {
      url:API_URL_MCH,
      chainId:420,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    mumbai:{
      url: API_URL_MUMBAI,
      accounts: [PRIVATE_KEY]
    }
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {  // copy the Etherscan object from the verify Contracts secion on Dashboard 
    apiKey: {
      mch: 'abc',
      polygonMumbai: API_KEY_MUMBAI
    },
    customChains: [
      {
        network: 'mch',
        chainId: 420,
        urls: {
        // Blockscout
        apiURL: 'https://explorer.oasys.sand.mchdfgh.xyz/api',
        browserURL: 'https://explorer.oasys.sand.mchdfgh.xyz'
        }
       },
    ],
  },
};