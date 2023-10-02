## Multi Ens Resolver

Smartcontract that allows to resolve multiple addresses to ens names or vise versa


### Motivation

This project was created to solve a practical task to convert a bunch of addresses to ens names on frontend. Viem and Wagmi has support for single name or address conversion using UniversalProvider under the hood ([getEnsName](https://viem.sh/docs/ens/actions/getEnsName.html) in viem). But has no support to fetch multiple names. First idea was to use multicall. But it happened that fetching of 82 addresses takes 52kb of calldata and 33kb of response. If you want to request avatars as well, the amount is doubled. This is quite heavy for user network. 

### Solution

This contract allows to pass a list of addresses and a text fields to fetch and get the list of names. Text fields allows to extract avatars, twitter usernames, etc, with the same request. Converting names to addresses also supported. Only required data is passed through the network. 

### Usage

Contacts store:
- Eth mainnet: `0x8F412599cA1A1623B0F51f9D78da31af09953b7d`
- Eth goerli: `0x3154827D8ffe04b21190C7acDf7f68866f2EcC6D`

### Scripts

#### Verify
- Mainnet
`npx hardhat verify 0x8F412599cA1A1623B0F51f9D78da31af09953b7d --network mainnet 0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62`

- Goerli
`npx hardhat verify 0x3154827D8ffe04b21190C7acDf7f68866f2EcC6D --network goerli 0x56522D00C410a43BFfDF00a9A569489297385790`

### Alternatives
There is a service from author of the ens normalizer that allows to convert a batch of names to addresses, https://raffy.antistupid.com/eth/ens-batch-resolver.html. However this service use multicall under the hood that is still heavy for users and doesn't support reverse resolving 