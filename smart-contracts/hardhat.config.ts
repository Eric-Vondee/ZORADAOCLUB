import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

const MORALIS_API_KEY_URL = process.env.MORALIS_API_KEY_URL;
const RINKEBY_API_KEY_URL = process.env.RINKEBY_API_KEY_URL;

const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
module.exports = {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: RINKEBY_API_KEY_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    mumbai: {
      url: MORALIS_API_KEY_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_KEY,
    },
    customChains: [
      {
        network: "rinkeby",
        chainId: 4,
        urls: {
          apiURL: "https://api-rinkeby.etherscan.io/api",
          browserURL: "https://rinkeby.etherscan.io",
        },
      },
    ],
  },
};
