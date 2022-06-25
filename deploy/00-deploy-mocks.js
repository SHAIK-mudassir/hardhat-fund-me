const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITITAL_VALUE,
} = require("../helper-hardhat-config")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    if (developmentChains.includes(network.name)) {
        log("Local network detected!Deploying Mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITITAL_VALUE],
        })
        log("Mocks Deployed!")
        log("--------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
