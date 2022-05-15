const { expect } = require("chai");

describe("Token contract", () => {
  let Token, token, owner, addr1, addr2;
  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transfer", () => {
    it("Transfer Token From Addr1 to Addr2", async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      const addr1BalanceAfterTransfer = await token.balanceOf(addr1.address);
      expect(addr2Balance).to.equal(50);
      expect(addr1BalanceAfterTransfer).to.equal(0);
    });
  });
});
