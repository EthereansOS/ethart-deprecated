/* Discussion:
 * https://dfohub.com/strategy
 */
/* Description:
 * A sustainable economic model for
 * DFO-based Startups to maintain value
 * and funds operations ethart version
 *
 * The V1 is the BUIDL fair inflation available here: https://drive.google.com/file/d/1_QZr5CjNsQKGxoJ5WkI9iPJGs4PdKWol
 *
 * In this Experiment based on ARTE Token, we'll inflate in one year the 1.21% (121,000) of the ARTE total Supply (10,000,000).
 *
 * Inflation events will be every week (50,000 ETH Blocks) In two Uniswap Exchanges:
 *
 * Uniswap V2 ETH/ARTE (1,100 ARTE Every Week) 0.01% Weekly Inflation
 *
 * Uniswap V2 BUIDL/ARTE (1,100 ARTE Every Week) 0.01% Weekly Inflation
 *
 * For a total of 2,200 ARTE every week (0.02%)
 *
 * This is an interesting experiment, because more the ARTE token is valuable, more BUIDL token will be removed from the Circulating Supply.
 *
 * This Fair Inflation mechanism will be used to empower the DFOhub Operations like the BUIDL Fair Inflation from the BUIDLERS FUND.
 */
pragma solidity ^0.6.0;

contract EthArtFairInflationFunctionality {

    function onStart(address,address) public {
        IMVDProxy proxy = IMVDProxy(msg.sender);

        address ethARTTokenToSwapAddress = 0x44b6e3e85561ce054aB13Affa0773358D795D36D;
        address bUIDLTokenAddress = 0xD6F0Bb2A45110f819e908a915237D652Ac7c5AA8;
        uint256 ethARTFISwapBlockLimit = 50000;
        uint256 ethARTFITotalSwapTimes = 55;
        uint256 ethARTFITokenAmountToSwapForEtherInV2 = 1100000000000000000000;
        uint256 ethARTFITokenAmountToSwapForBUIDLInV2 = 1100000000000000000000;

        IStateHolder stateHolder = IStateHolder(proxy.getStateHolderAddress());
        stateHolder.setAddress("ethARTTokenToSwapAddress", ethARTTokenToSwapAddress);
        stateHolder.setAddress("bUIDLTokenAddress", bUIDLTokenAddress);
        stateHolder.setUint256("ethARTFISwapBlockLimit", ethARTFISwapBlockLimit);
        stateHolder.setUint256("ethARTFITotalSwapTimes", ethARTFITotalSwapTimes);
        stateHolder.setUint256("ethARTFITokenAmountToSwapForEtherInV2", ethARTFITokenAmountToSwapForEtherInV2);
        stateHolder.setUint256("ethARTFITokenAmountToSwapForBUIDLInV2", ethARTFITokenAmountToSwapForBUIDLInV2);
    }

    function onStop(address) public {
        IStateHolder stateHolder = IStateHolder(IMVDProxy(msg.sender).getStateHolderAddress());
        stateHolder.clear("ethARTTokenToSwapAddress");
        stateHolder.clear("bUIDLTokenAddress");
        stateHolder.clear("ethARTFISwapBlockLimit");
        stateHolder.clear("ethARTFITotalSwapTimes");
        stateHolder.clear("ethARTFITokenAmountToSwapForEtherInV2");
        stateHolder.clear("ethARTFITokenAmountToSwapForBUIDLInV2");
        stateHolder.clear("ethARTFILastSwapBlock");
        stateHolder.clear("ethARTFISwapTimes");
    }

    function ethArtFairInflation() public {
        IMVDProxy proxy = IMVDProxy(msg.sender);
        IStateHolder stateHolder = IStateHolder(proxy.getStateHolderAddress());

        uint256 ethARTFISwapTimes = stateHolder.getUint256("ethARTFISwapTimes");
        require(ethARTFISwapTimes < stateHolder.getUint256("ethARTFITotalSwapTimes"), "Total swap times reached");
        stateHolder.setUint256("ethARTFISwapTimes", ethARTFISwapTimes + 1);

        require(block.number >= (stateHolder.getUint256("ethARTFILastSwapBlock") + stateHolder.getUint256("ethARTFISwapBlockLimit")), "Too early to swap new Tokens!");
        stateHolder.setUint256("ethARTFILastSwapBlock", block.number);

        address dfoWalletAddress = proxy.getMVDWalletAddress();
        IERC20 ethARTTokenToSwap = IERC20(stateHolder.getAddress("ethARTTokenToSwapAddress"));

        uint256 ethARTFITokenAmountToSwapForEtherInV2 = stateHolder.getUint256("ethARTFITokenAmountToSwapForEtherInV2");
        uint256 ethARTFITokenAmountToSwapForBUIDLInV2 = stateHolder.getUint256("ethARTFITokenAmountToSwapForBUIDLInV2");

        proxy.transfer(address(this), ethARTFITokenAmountToSwapForEtherInV2 + ethARTFITokenAmountToSwapForBUIDLInV2, address(ethARTTokenToSwap));

        uniswapV2(stateHolder, ethARTFITokenAmountToSwapForEtherInV2, ethARTFITokenAmountToSwapForBUIDLInV2, ethARTTokenToSwap, dfoWalletAddress);
    }

    function uniswapV2(IStateHolder stateHolder, uint256 ethARTFITokenAmountToSwapForEtherInV2, uint256 ethARTFITokenAmountToSwapForBUIDLInV2, IERC20 ethARTTokenToSwap, address dfoWalletAddress) private {
        if(ethARTFITokenAmountToSwapForEtherInV2 <= 0 && ethARTFITokenAmountToSwapForBUIDLInV2 <= 0) {
            return;
        }
        IUniswapV2Router uniswapV2Router = IUniswapV2Router(stateHolder.getAddress("uniswapV2RouterAddress"));
        if(ethARTTokenToSwap.allowance(address(this), address(uniswapV2Router)) == 0) {
            ethARTTokenToSwap.approve(address(uniswapV2Router), 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
        }

        address[] memory path = new address[](2);
        path[0] = address(ethARTTokenToSwap);
        if(ethARTFITokenAmountToSwapForEtherInV2 > 0) {
            path[1] = uniswapV2Router.WETH();
            uniswapV2Router.swapExactTokensForETH(ethARTFITokenAmountToSwapForEtherInV2, uniswapV2Router.getAmountsOut(ethARTFITokenAmountToSwapForEtherInV2, path)[1], path, dfoWalletAddress, block.timestamp + 1000);
        }

        if(ethARTFITokenAmountToSwapForBUIDLInV2 > 0) {
            path[1] = stateHolder.getAddress("bUIDLTokenAddress");
            uniswapV2Router.swapExactTokensForTokens(ethARTFITokenAmountToSwapForBUIDLInV2, uniswapV2Router.getAmountsOut(ethARTFITokenAmountToSwapForBUIDLInV2, path)[1], path, dfoWalletAddress, block.timestamp + 1000);
        }
    }
}

interface IUniswapV2Router {
    function WETH() external pure returns (address);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}

interface IMVDProxy {
    function getToken() external view returns(address);
    function getStateHolderAddress() external view returns(address);
    function getMVDWalletAddress() external view returns(address);
    function transfer(address receiver, uint256 value, address token) external;
}

interface IStateHolder {
    function setUint256(string calldata name, uint256 value) external returns(uint256);
    function getUint256(string calldata name) external view returns(uint256);
    function getAddress(string calldata name) external view returns(address);
    function setAddress(string calldata varName, address val) external returns (address);
    function clear(string calldata varName) external returns(string memory oldDataType, bytes memory oldVal);
}

interface IERC20 {
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}
