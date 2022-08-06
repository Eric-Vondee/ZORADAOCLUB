import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import { ethers } from "hardhat";

async function main() {
  const MasterCopyRinkeby: string =
    "0x9c5ba02C7CCd1F11346E43785202711cE1DCc130";
  const ProxyFactoryRinkeby: string =
    "0x23cCC7463468e3C56A4CE37Afab577EB3dd0e3CB";

  const contract = await ethers.getContractFactory("Factory");
  const contractDeploy = await contract.deploy(
    ProxyFactoryRinkeby,
    MasterCopyRinkeby
  );
  await contractDeploy.deployed();

  console.log("Contract Deploy at", contractDeploy.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract after deploying
  //@ts-ignore
  await hre.run("verify:verify", {
    address: contractDeploy.address,
    constructorArguments: [ProxyFactoryRinkeby, MasterCopyRinkeby],
  });

  console.log("done");

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
