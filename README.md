# ethArt

## On-chain ERC 721 deployer for Etherean Artists

Artist needs a free and fancy way to deploy Non-Fungible Tokens (ERC 721) without any line of code. 

ethArt is a simple tool to deploy and manage NFTs, with two level of decentralization:

### Distributed:

File and metadata deployed using IPFS

### Decentralized:

File deployed on-chain by BASE 64, expensive, but perpetual!

## Compatibility:

This ERC 721 contract is compatible with OpenSea and finally ethereans can create and trade Non-fungible Tokens that are really perpetual.

## DFO Implementation (Experiment):

This ERC-721 standard Non Fungible Tokens implementation that exploits all the power of DFO. DFOBased721 Smart Contract is a wrapper that lets third-party applications (e.g. OpenSea, Cryptovoxels, etc.) easily interface and interact with NFTs.

In fact, all standard ERC721 methods called in this Contract are totally redirected to the ethArt DFO which really stores and manages real data through its Microservices.

Ethart is an exciting R&D in how this kind of new self-sovereign bank can be used in the future. We made a lot of open source code by developing this reusable by future DFOs.

### Advantages

1. Flexibility: The community can directly manage it to solve protocol bugs or add features.

2. Extension: If, for any reason in the future, a new NFT standard will come out, this wrapper can be changed to accept new capabilities without the need to migrate any single byte of data.

3. Perpetual Storage: To avoid classical ERC721 censorship problems, NFTs made with this Dapp can be also stored on-chain, to keep them always available in any circumstances.

4. Triple interaction: You can use it passing through this wrapper, the DFOHub portal or the ethArt web Application. They retrieve and set data from/to the same source.

## Business Model:

### Ethart Bank:

ARTE (Voting Token) holders can rule information of NFTs stored in the State Holder of Ethart (NFT Owner and NFT Data), like an anonymous bank in co-ownership with the ERC721 holders. ARTE tokens are backed by the value of every ERC721 deployed.

This kind of philosophy and architecture is quite different from DFOhub because DFOhub, by design, doesn't own any right from deployed DFOs. But some kinds of applications in the future can use the Ethart example and code, for some reason, like a shared vault or self-sovereign web3 based Social Media.

ARTE tokens are 10,000,000:

- 25% of $ARTE (2,500,000) are locked in the DFOhub Wallet [0x5D40c724ba3e7Ffa6a91db223368977C522BdACD] (Owned by $BUIDL holders)

- 60% of $ARTE (6,000,000) are locked in the Ethart Wallet [0x7687fd356d1BD155e72B6eee6c2E2067F08489fB] (Owned by $ARTE Holders, everytime a user mint a ERC721 in a co-ownership with Ethart Bank, the 100 ARTE are paid from this wallet) 

- 13.5% (1,3500) are locked in the BUIDLERS FUND [0x2BbBC1238b567F240A915451bE0D8c210895aa95], the operational fund of DFO Core Team, with a Fair Inflation meccanism of the 1.21% (121,000 ARTE) in a year

- The only way to receive $ARTE is to mint ERC721 in co-ownership with the Ethart Bank.

You can choose to mint ERC721 in a co-ownership with Ethart Bank (by receiving 100 ARTE and becoming a holder) or maintaining the full ownership of the NFT without receiving $ARTE tokens.

### Ethart Fair Inflation:

A sustainable economic model for DFO-based Startups to maintain value and funds operations | ethart version

The V1 is the BUIDL fair inflation available here: https://drive.google.com/file/d/1_QZr5CjNsQKGxoJ5WkI9iPJGs4PdKWol

In this Experiment based on ARTE Token, we'll inflate in one year the 1.21% (121,000) of the $ARTE total Supply (10,000,000).

Inflation events will be every week (50,000 ETH Blocks) In two Uniswap Exchanges:
- Uniswap V2 $ETH/$ARTE (1,100 $ARTE Every Week) 0.01% Weekly Inflation
- Uniswap V2 $BUIDL/$ARTE (1,100 $ARTE Every Week) 0.01% Weekly Inflation
For a total of 2,200 $ARTE every week (0.02%)

Smart Contract: https://github.com/b-u-i-d-l/ethArt/blob/master/contracts/EthartFairInflation.sol

This is an interesting experiment, because more the $ARTE token is valuable, more BUIDL token will be removed from the Circulating Supply. This Fair Inflation mechanism will be used to empower the DFOhub Operations like the BUIDL Fair Inflation from the BUIDLERS FUND.

This project is open source without any fees added, but users can donate ETH to the DFOhub Wallet, so every donation will increase the backed value of $BUIDL and used to R&D more in this field.
