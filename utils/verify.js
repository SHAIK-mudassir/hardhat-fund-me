const { getContractAddress } = require("ethers/lib/utils")
const { run } = require("hardhat")
const verify = async (constractAddress, args) => {
    console.log("Veerifying Contracts")
    try {
        await run("verify:verify", {
            address: constractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowecase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}
module.exports = { verify }
