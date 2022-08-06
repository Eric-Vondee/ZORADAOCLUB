import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";

async function group() {
  const FactoryAddressRinkeby: string =
    "0x9c50485916f8060Bd73Ba6759984B0E145fDD147";
  const groupaddress: string = "0x13fc58a30ab08f4bf27e8a5b85406f28413171d4";

  const _gnosisowners = [
    "0x14254ce9aB9B3aaD797aF7e55374fE97dC981e8C",
    "0x86541d0b80e078887175fcBb097Fc575707ED70B",
  ];
  const _groupName = "ZoraDoa";
  const _groupSymbol = "ZDC";
  const _addressToken = "0x0000000000000000000000000000000000000000";
  const _depositEndDate = 1669876756;
  const _depositLimit = ethers.utils.parseEther("0.05");
  const _maxMembers = 5;

  const FactoryContract = await ethers.getContractAt(
    "Factory",
    FactoryAddressRinkeby
  );

  const NewGroup = await FactoryContract.createGroup(
    _gnosisowners,
    _groupName,
    _groupSymbol,
    _addressToken,
    _depositEndDate,
    _depositLimit,
    _maxMembers
  );

  await NewGroup.wait(1);

  //     console.log(txNewGroup.events[0].args);

  //   const groupContract = await ethers.getContractAt(
  //     "GroupManagement",
  //     groupaddress
  //   );

  // const changeLimit = await groupContract.setDepositLimit(1659999147);
  // const tx = await changeLimit.wait(1);
  // console.log(tx);

  //   await groupContract.setDepositEnDate(1669805584);
  //   console.log("new date set ================");

  //   const addDepTx = await groupContract.addDeposit(
  //     ethers.utils.parseEther("0.05")
  //   );
  //   await addDepTx.wait(1);

  ////////////////////////////////////////////////////
  // MintTo Fn

  //   const mintToTx = await groupContract.mintTokenTo(
  //     "0x14254ce9aB9B3aaD797aF7e55374fE97dC981e8C",
  //     ethers.utils.parseEther("100")
  //   );
  //   await mintToTx.wait(1);
  //   const balTx = await groupContract.balanceOf(
  //     "0x14254ce9aB9B3aaD797aF7e55374fE97dC981e8C"
  //   );
  //   console.log(balTx);

  ///////////////////////////////////////////////////
  // Init NFT addr Fn
  //   const updateNftAddress = await groupContract.updateNftAddress(
  //     "0xBa337de931B0B6Cdc82332830467b5F53f207074"
  //   );
  //   await updateNftAddress.wait(1);
  //   console.log("Nft address updated =================");

  ///////////////////////////////////////////
  // Mint NFt Fn
  //   const mintNft = await groupContract.mintNft(1, {
  //     value: ethers.utils.parseEther("0.0001"),
  //   });
  // // console.log(mintNft);
  //   console.log("Nft minted successfully =================");
  //   // Check balance after minting
  //   let balTx = await groupContract.balanceOf(
  //     "0x14254ce9aB9B3aaD797aF7e55374fE97dC981e8C"
  //   );
  //   console.log(balTx);

  //////////////////////////////////////////////
  // Claim Token
  //   const claimToken = await groupContract.claimToken();
  //   await claimToken.wait(1);
  //   const balTx = await groupContract.balanceOf(
  //     "0x14254ce9aB9B3aaD797aF7e55374fE97dC981e8C"
  //   );
  //   console.log(balTx);
  //   console.log("Token Claimed successfully =================");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
group().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
