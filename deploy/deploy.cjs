module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [];
  await deploy("IpfsHashStorage", {
    contract: "IpfsHashStorage",
    args: args,
    from: deployer,
    log: true,
  });
};
module.exports.tags = ["IpfsHashStorage"];
