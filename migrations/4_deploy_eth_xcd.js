/* global artifacts */
require('dotenv').config({ path: '../.env' })
const ETHMorse = artifacts.require('ETHMorse')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { MERKLE_TREE_HEIGHT, ETH_AMOUNT } = process.env
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await ETHMorse.link(hasherContract, hasherInstance.address)
    const Morse = await deployer.deploy(ETHMorse, verifier.address, ETH_AMOUNT, MERKLE_TREE_HEIGHT, accounts[0])
    console.log('ETHMorse\'s address ', Morse.address)
  })
}
