import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY!}`,
      },
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY!}`,
      chainId: 1,
      accounts: [process.env.PRIVATE_KEY!],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY!}`,
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY!],
    }
  },
  abiExporter: [
    {
      path: "./abi",
      format: "json",
      runOnCompile: true,
    },
  ],
  etherscan: {
    apiKey: {
      goerli: process.env.GOERLI_ETHERSCAN_KEY!,
      mainnet: process.env.MAINNET_ETHERSCAN_KEY!
    }
  }
};

export default config;
