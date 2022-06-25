const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    //const ethUSdPriceFeedAddress = networkconfig[chainId]["ethUsdPriceFeed"]
    let ethUSdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const aggregator = await deployments.get("MockV3Aggregator")
        ethUSdPriceFeedAddress = aggregator.address
    } else {
        ethUSdPriceFeedAddress = networkconfig[chainId]["ethUsdPriceFeed"]
    }
    const args = [ethUSdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
}
module.exports.tags = ["all", "fundme"]
