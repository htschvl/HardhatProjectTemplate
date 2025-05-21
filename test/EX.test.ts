import { expect } from "chai";
import { ethers } from "hardhat";
import { Example } from "../typechain";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Example Token", function () {
  let exampleToken: Example;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();

    // Deploy the contract
    const ExampleFactory = await ethers.getContractFactory("Example");
    exampleToken = await ExampleFactory.deploy(owner.address) as Example;
  });

  it("Should have the correct name and symbol", async function () {
    expect(await exampleToken.name()).to.equal("Example");
    expect(await exampleToken.symbol()).to.equal("EX");
  });

  it("Should mint tokens when called by owner", async function () {
    await exampleToken.mint(addr1.address, ethers.parseEther("100"));
    expect(await exampleToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
  });

  it("Should fail when non-owner tries to mint", async function () {
    await expect(
      exampleToken.connect(addr1).mint(addr1.address, ethers.parseEther("100"))
    ).to.be.reverted;
  });
});