require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_URL_MCH = process.env.API_URL_MCH;
const API_URL_MUMBAI = process.env.API_URL_MUMBAI;
const API_URL_SHIBUYA = process.env.API_URL_SHIBUYA;
const API_KEY_MUMBAI = process.env.API_KEY_MUMBAI;
const API_KEY_SHIBUYA = process.env.API_KEY_SHIBUYA;

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
    },
    shibuya: {
      url: API_URL_SHIBUYA,
      accounts: [PRIVATE_KEY]
    }
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {  // copy the Etherscan object from the verify Contracts secion on Dashboard 
    apiKey: {
      mch: 'abc',
      polygonMumbai: API_KEY_MUMBAI,
      shibuya: API_KEY_SHIBUYA
    },
    customChains: [
      {
        network: 'mch',
        chainId: 420,
        urls: {
        apiURL: 'https://explorer.oasys.sand.mchdfgh.xyz/api',
        browserURL: 'https://explorer.oasys.sand.mchdfgh.xyz'
        }
       },
       {
        network: 'shibuya',
        chainId: 81,
        urls: {
          apiURL: 'https://blockscout.com/shibuya/api',
          browserURL: 'https://blockscout.com/shibuya'
        }
       }
    ],
  },
};