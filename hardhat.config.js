require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("sayHi", "User say Hi", async () => {
  const accounts = await ethers.getSigners();
  console.log(`${accounts[0].address} say hi`);
});

const INFURA_URL =
  "";
const PRIVATE_KEY =
  "";

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
