/* global artifacts */
require('dotenv').config({ path: '../.env' })
const ERC20XCD = artifacts.require('ERC20XCD')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')
const ERC20Mock = artifacts.require('ERC20Mock')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { MERKLE_TREE_HEIGHT, ERC20_TOKEN, TOKEN_AMOUNT } = process.env
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await ERC20XCD.link(hasherContract, hasherInstance.address)
    let token = ERC20_TOKEN
    if(token === '') {
      const tokenInstance = await deployer.deploy(ERC20Mock)
      token = tokenInstance.address
    }
    const XCD = await deployer.deploy(
      ERC20XCD,
      verifier.address,
      TOKEN_AMOUNT,
      MERKLE_TREE_HEIGHT,
      accounts[0],
      token,
    )
    console.log('ERC20XCD\'s address ', XCD.address)
  })
}
