import { Networks } from '../types'

type Address = { [key in Networks]: string }

export const CONTROLLER: Address = {
  1: '',
  3: '0xbf7223b5915470c1eFee97eD5a675A36F2c523af',
  421611: '0x6FBbc7eBd7E421839915e8e4fAcC9947dC32F4dE',
  31337: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
}

export const VAULT_MANAGER: Address = {
  1: '',
  3: '0xa4F26a92e5D536E152825328F595a57578398e74',
  421611: '0x40FA4273a739667D7dBf1C46755C27338eAa0728',
  31337: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
}

export const WSQUEETH: Address = {
  1: '',
  3: '0x06980aDd9a68D17eA81C7664ECD1e9DDB85360D9',
  421611: '0xEC0db8766bc003C14861af996e411beA6Bf800aB',
  31337: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
}

export const WETH: Address = {
  1: '',
  3: '0xc778417e063141139fce010982780140aa0cd5ab',
  421611: '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
  31337: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
}

// change this to USDC!
export const DAI: Address = {
  1: '',
  3: '0x27415c30d8c87437becbd4f98474f26e712047f4',
  421611: '0xc4D15025D49a88D70B023870d810f4cAa5c18a63',
  31337: '0x8dF057949E6717B6f28962f30e8415b148241e16',
}

export const UNI_V3_FACTORY: Address = {
  1: '',
  3: '0xa9C2f675FF8290494675dF5CFc2733319EaeeFDc',
  421611: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  31337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
}

export const SWAP_ROUTER: Address = {
  1: '',
  3: '0x528a19A3e88861E7298C86fE5490B8Ec007a4204',
  421611: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  31337: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
}

export const SQUEETH_UNI_POOL: Address = {
  1: '',
  3: '0x446E152e3E1bD478E9C13B9f798Ca7dB39E2F35a',
  421611: '0x0567A9C01990a4C7EE096F077A05CeEbA87db07f',
  31337: '0x8dF057949E6717B6f28962f30e8415b148241e16',
}

export const QUOTER: Address = {
  1: '',
  3: '0x267aEB76BEb6DC7Ab0D88FeEaC8A948e237e2d69',
  421611: '0x8f92cfB1BF6eD1ce79F2E8Eb0DC96e0F3b61276D',
  31337: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
}

export const SHORT_HELPER: Address = {
  1: '',
  3: '0x199c5879e95F4629b25FD7e0C0542BA3731e75C6',
  421611: '0x5A30a1E3873A2B5Fc9DB9b2b52491C4b6086FAe0',
  31337: '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
}

export const ORACLE: Address = {
  1: '',
  3: '0x6A0451153CeD706f83f8104b2E0e3d8f465612Ff',
  421611: '0xe790Afe86c0bdc4Dd7C6CBb7dB087552Ec85F6fB',
  31337: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
}

// change this to USD!
export const ETH_DAI_POOL: Address = {
  1: '',
  3: '0x8356AbC730a218c24446C2c85708F373f354F0D8',
  421611: '0xe7715b01a0B16E3e38A7d9b78F6Bd2b163D7f319',
  31337: '0x8dF057949E6717B6f28962f30e8415b148241e16',
}

export const NFT_MANAGER: Address = {
  1: '',
  3: '0x8c7c1f786da4dee7d4bb49697a9b0c0c8fb328e0',
  421611: '',
  31337: '',
}

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'
