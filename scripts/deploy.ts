import { ethers, network } from "hardhat";

async function main() {
  const universalResolverAddresses = {
    1: '0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62',
    5: '0x56522D00C410a43BFfDF00a9A569489297385790'
  } as {[chainId: number]: string}

  const universalResolverAddress = universalResolverAddresses[network.config.chainId!];

  const multiEnsResolver = await ethers.deployContract("MultiEnsResolver", [universalResolverAddress]);

  await multiEnsResolver.waitForDeployment();

  console.log(`MultiEnsResolver deployed to ${multiEnsResolver.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
