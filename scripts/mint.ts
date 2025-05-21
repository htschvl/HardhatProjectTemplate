import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TO_ADDRESS = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const AMOUNT = ethers.parseUnits("1000", 18); // Mint 1000 tokens


async function main() {
  const [deployer] = await ethers.getSigners();

  const ERC20 = await ethers.getContractAt("Example", CONTRACT_ADDRESS);

  const ERC20WithSigner = ERC20.connect(deployer);

  const tx = await ERC20WithSigner.mint(TO_ADDRESS, AMOUNT);
  await tx.wait();

  console.log(`Minted ${AMOUNT.toString()} tokens to ${TO_ADDRESS}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});