import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

import {
  abi as SWAP_ROUTER_ABI,
  bytecode as SWAP_ROUTER_BYTECODE,
} from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

import {
  abi as POSITION_MANAGER_ABI,
  bytecode as POSITION_MANAGER_BYTECODE,
} from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'

import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'

import {
  abi as QUOTER_ABI,
  bytecode as QUOTER_BYTECODE,
} from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deployer } = await getNamedAccounts();

  const {deploy} = deployments;

  // Deploy WETH9 and UniswapV3Factory for SwapRouter.

  await deploy("MockErc20", { from: deployer, args: ["DAI", "DAI"], skipIfAlreadyDeployed: false });

  await deploy("WETH9", {
    from: deployer,
    log: true,
  });

  console.log(`WETH9 Deployed 🍇`)

  await deploy("UniswapV3Factory", {
    from: deployer,
    log: true,
    contract: {
      abi: FACTORY_ABI,
      bytecode: FACTORY_BYTECODE
    }
  });
  console.log(`UniswapV3Factory Deployed 🍹`)

  const uniswapFactory = await ethers.getContract("UniswapV3Factory", deployer);
  const weth9 = await ethers.getContract("WETH9", deployer);

  await deploy("SwapRouter", {
    from: deployer,
    log: true,
    contract: {
      abi: SWAP_ROUTER_ABI,
      bytecode: SWAP_ROUTER_BYTECODE
    },
    args: [uniswapFactory.address, weth9.address]
  });
  console.log(`SwapRouter Deployed 🍍`)

  // tokenDescriptor is only used to query tokenURI() on NFT. Don't need that in our deployment
  const tokenDescriptorAddress = ethers.constants.AddressZero

  await deploy("NonfungibleTokenPositionManager", {
    from: deployer,
    log: true,
    contract: {
      abi: POSITION_MANAGER_ABI,
      bytecode: POSITION_MANAGER_BYTECODE,
    },
    args: [uniswapFactory.address, weth9.address, tokenDescriptorAddress]
  });

  console.log(`NonfungibleTokenPositionManager Deployed 🥑\n`)
  
  await deploy("Quoter", {
    from: deployer,
    log: true,
    contract: {
      abi: QUOTER_ABI,
      bytecode: QUOTER_BYTECODE,
    },
    args: [uniswapFactory.address, weth9.address]
  });

  console.log(`Quoter Deployed  🥦\n`)  
  // next: deploy oracle with the SQUEETH/ETH Pool and ETH/DAI Pool addresses
}

export default func;