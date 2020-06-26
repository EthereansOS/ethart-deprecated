# ethArt

## On-chain ERC721 deployer for Etherean Artists

Artists need a free and fancy way to deploy—and manage—ERC721 Non-Fungible Tokens (NFTs) without any line of code. 

ethArt is a simple tool to do this, with two level of decentralization:

### Distributed:

File and metadata deployed using IPFS.

### Decentralized:

File deployed on-chain by BASE 64. Expensive, but perpetual!

## Compatibility:

This ERC721 contract is compatible with OpenSea. Finally, Ethereans can create and trade NFTs that are really perpetual.

## DFO Implementation (Experiment):

Implementing these ERC721 NFTs using ethArt exploits all the power of DFO technology. The DFOBased721 Smart Contract is a wrapper that enables third-party applications (OpenSea, Cryptovoxels, etc.) to easily interface and interact with NFTs.

In fact, all standard ERC721 methods called in this Contract are redirected to the ethArt DFO, which stores and manages real data through its Microservices.

ethArt is an exciting R&D project. We’re exploring how a new kind of self-sovereign bank can operate and be used in the future. In the process of development, we’ve also created a lot of open source code that can be reused by future DFOs.

### Advantages

1. Flexibility: The community can directly manage it to solve protocol bugs or add features.

2. Extension: If, for any reason in the future, a new NFT standard comes out, this wrapper can adapt to it, without needing to migrate a single byte of data.

3. Perpetual Storage: To avoid classic ERC721 censorship problems, NFTs made with this dApp can also be stored on-chain, always available under any circumstances.

4. Triple Interaction: You can use it passing through this wrapper, the DFOhub portal or the ethArt web application. They retrieve and set data from/to the same source.

## Business Model:

### Ethart Bank:

$ARTE (Voting Token) holders can manage the information of NFTs stored in the State Holder of ethArt (NFT Owner and NFT Data) like an anonymous bank, in co-ownership with the ERC721 holders. ARTE tokens are backed by the value of every ERC721 deployed.

This kind of philosophy and architecture is quite different from DFOhub because DFOhub, by design, doesn't have rights over deployed DFOs. But apps in the future can use the ethArt example to code things—like a shared vault, or a self-sovereign web3 based social media.

ARTE tokens are 10,000,000:

- 25%(2,500,000) are locked in the DFOhub Wallet [0x5D40c724ba3e7Ffa6a91db223368977C522BdACD] 
(Owned by $BUIDL holders)

- 60% (6,000,000) are locked in the Ethart Wallet [0x7687fd356d1BD155e72B6eee6c2E2067F08489fB] 
(Owned by $ARTE Holders. Every time a user mints a ERC721 in a co-ownership with ethArt Bank, the 100 ARTE are airdropped from this wallet)

- 13.5% (1,350,000) are locked in the BUIDLers’ Fund [0x2BbBC1238b567F240A915451bE0D8c210895aa95] 
(The operational fund of DFOhub’s Core Team, with a Fair Inflation mechanism of 1.21% (121,000 ARTE) over one year)

The only way to receive $ARTE is to mint ERC721 in co-ownership with the Ethart Bank.

You can choose to mint ERC721 in a co-ownership with the Ethart Bank (and receive 1 ARTE) or maintain full ownership of the NFT without receiving $ARTE tokens.

### Ethart Fair Inflation:

A sustainable economic model for DFO-based startups to maintain value and fund operations | ethArt version

The original BUIDL Fair Inflation paper is available here: https://drive.google.com/file/d/1_QZr5CjNsQKGxoJ5WkI9iPJGs4PdKWol

For the $ARTE experiment, we will inflate the circulating supply by 1.21% (121,000) of the total supply (10,000,000) over one year..

Inflation events will occur once a week (every 50,000 ETH Blocks) across two Uniswap pairs for a total of 2,200 $ARTE each time:
- Uniswap V2 $ETH/$ARTE (1,100 $ARTE Every Week) 0.01% Weekly Inflation
- Uniswap V2 $BUIDL/$ARTE (1,100 $ARTE Every Week) 0.01% Weekly Inflation

For a total of 2,200 $ARTE every week (0.02%)

Smart Contract: https://github.com/b-u-i-d-l/ethArt/blob/master/contracts/EthartFairInflation.sol

As $ARTE becomes more valuable, $BUIDL will be removed from the circulating supply. This mechanism will empower DFOhub operations.

It will be an interesting experiment.

This project is open source and without fees, but users can donate ETH to the DFOhub Wallet. Every donation increases the backed value of $BUIDL and furthers R&D in this field.

# UPDATE

The DFOhub team has temporarily voted to reduce to 1 $ARTE the prize received for each co-owned NFT minted for these reasons:

1. Single Point Of Failure: This experiment in less than one week highlighted that 100 ARTE for every NFT minted is the wrong incentive.

2. Incentives: The V1 architecture allows people to mint NFT and earn 100 $ARTE without caring to create valuable NFTs for all $ARTE Holders.

# And Now?

We're already working for the next big update of ethart (ethart V2), based on solving the quality issue.

## New Reward System for minting Co-Owned NFTs:

Every minted NFT will remain pending for a weekly period, and if ARTE holders vote by staking a sufficient amount of Tokens, the NFT will be added to the list, and the creator will earn the Reward. This new architecture can empower the participation of ARTE holder based on a fundamental incentive to empower the quality of minted NFTs:

If ARTE holders think that a co-owned NFT can generate value = they choose to Reward the creator (using the ethart locked funds | 0x7687fd356d1BD155e72B6eee6c2E2067F08489fB) by minting the co-owned NFT. If not, the NFT will not be minted

## State Holder Improvements: 

Improvements in gas fees to reduce the cost of minting Co-Owned NFTs

## Rewards Flexible Halving System:

The reward after the proposal to mint a Co-Owned NFT will be halved by the amount of locked token in the ethart wallet.

You can follow this R&D by this repo. More info in the following weekly updates: https://medium.com/dfohub
