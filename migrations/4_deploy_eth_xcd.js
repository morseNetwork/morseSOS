/* global artifacts */
require('dotenv').config({ path: '../.env' })
const ETHXCD = artifacts.require('ETHXCD')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { MERKLE_TREE_HEIGHT, ETH_AMOUNT } = process.env
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await ETHXCD.link(hasherContract, hasherInstance.address)
    const XCD = await deployer.deploy(ETHXCD, verifier.address, ETH_AMOUNT, MERKLE_TREE_HEIGHT, accounts[0])
    console.log('ETHXCD\'s address ', XCD.address)
  })
}
