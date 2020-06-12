// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract MintFunctionality {

    function onStart(address,address) public {
    }

    function onStop(address) public {
    }

    function mint(address sender, uint256, string memory metadataLink, bytes32 metadataHash, bytes memory chunk, bool finalize, uint256 originalId, uint256 amount) public returns (uint256[] memory) {
        IStateHolder stateHolder = IStateHolder(IMVDProxy(msg.sender).getStateHolderAddress());
        uint256 tokenId = originalId != 0 ? originalId : stateHolder.getUint256("nextId");
        tokenId = tokenId == 0 ? 1 : tokenId;
        stateHolder.setUint256("nextId", tokenId + (amount == 0 ? 1 : amount));
        stateHolder.setUint256("totalSupply", stateHolder.getUint256("totalSupply") + (amount == 0 ? 1 : amount));
        stateHolder.setAddress(_stringConcat(_toString(tokenId), "owner", ""), sender);
        stateHolder.setString(_stringConcat(_toString(tokenId), "", ""), metadataLink);
        stateHolder.setBytes(_stringConcat(_toString(tokenId), "hash", ""), abi.encodePacked(metadataHash));
        _updateBalanceAndCopies(sender, stateHolder, tokenId, amount);
        _concatenateChunks(stateHolder, tokenId, chunk, finalize);
        return _elaborateResult(tokenId, amount, sender);
    }

    function _elaborateResult(address sender, uint256 tokenId, uint256 amount) private returns(uint256[] memory result) {
        IMVDProxy(msg.sender).emitEvent("Minted(address_indexed,address,uint256,uint256)", abi.encodePacked(sender), bytes(""), abi.encode(sender, tokenId, amount == 0 ? 1 : amount));
        uint256 length = amount == 0 ? 1 : amount;
        result = new uint256[](length);
        for(uint256 i = 0; i < length; i++) {
            result[i] = tokenId + i;
        }
    }

    function _updateBalanceAndCopies(address sender, IStateHolder stateHolder, uint256 tokenId, uint256 amount) private {
        uint256 balance = stateHolder.getUint256(_stringConcat(_toString(sender), "balance", ""));
        stateHolder.setUint256(_stringConcat(_toString(sender), _toString(tokenId), ""), balance);
        stateHolder.setUint256(_stringConcat(_toString(sender), "indexOf", _toString(balance)), tokenId);
        stateHolder.setUint256(_stringConcat(_toString(sender), "balance", ""), balance + (amount == 0 ? 1 : amount));
        if(amount <= 1) {
            return;
        }
        for(uint256 i = 1; i < amount - 1; i++) {
            stateHolder.setUint256(_stringConcat(_toString(sender), _toString(tokenId + i), ""), balance + i);
            stateHolder.setUint256(_stringConcat(_toString(sender), "indexOf", _toString(balance + i)), tokenId + i);
            stateHolder.setUint256(_stringConcat(_toString(tokenId + i), "parent", ""), tokenId);
        }
    }

    function _concatenateChunks(IStateHolder stateHolder, uint256 tokenId, bytes memory chunk, bool finalize) private {
        if(_isEmpty(string(chunk))) {
            return;
        }
        uint256 amount = stateHolder.getUint256(_stringConcat(_toString(tokenId), "chunk", "amount"));
        stateHolder.setBytes(_stringConcat(_toString(tokenId), "chunk", _toString(stateHolder.setUint256(_stringConcat(_toString(tokenId), "chunk", "amount"), amount + 1))), chunk);
        require(!stateHolder.setBool(_stringConcat(_toString(tokenId), "finalized", ""), finalize), "Already Finalized!");
    }

    bytes32 private constant EMPTY_STRING = keccak256("");

    function _stringConcat(string memory a, string memory b, string memory c) private pure returns(string memory) {
        bool aEmpty = _isEmpty(a);
        bool bEmpty = _isEmpty(b);
        bool cEmpty = _isEmpty(c);
        return _toLowerCase(string(abi.encodePacked(
            a,
            aEmpty || bEmpty ? "" : "_",
            b,
            (aEmpty && bEmpty) || cEmpty ? "" : "_",
            c
        )));
    }

    function _isEmpty(string memory test) private pure returns(bool) {
        return keccak256(bytes(test)) == EMPTY_STRING;
    }

    function _toString(address _addr) private pure returns(string memory) {
        bytes32 value = bytes32(uint256(_addr));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint(uint8(value[i + 12] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
        }
        return string(str);
    }

    function _toString(uint _i) private pure returns(string memory) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }

    function _toLowerCase(string memory str) private pure returns(string memory) {
        bytes memory bStr = bytes(str);
        for (uint i = 0; i < bStr.length; i++) {
            bStr[i] = bStr[i] >= 0x41 && bStr[i] <= 0x5A ? bytes1(uint8(bStr[i]) + 0x20) : bStr[i];
        }
        return string(bStr);
    }
}

interface IMVDProxy {
    function getMVDFunctionalitiesManagerAddress() external view returns(address);
    function getStateHolderAddress() external view returns(address);
    function emitEvent(string calldata eventSignature, bytes calldata firstIndex, bytes calldata secondIndex, bytes calldata data) external;
}

interface IMVDFunctionalitiesManager {
    function isAuthorizedFunctionality(address functionality) external view returns(bool);
}

interface IStateHolder {
    function exists(string calldata varName) external view returns(bool);
    function clear(string calldata varName) external returns(string memory oldDataType, bytes memory oldVal);
    function setBytes(string calldata varName, bytes calldata val) external returns(bytes memory);
    function getBytes(string calldata varName) external view returns(bytes memory);
    function setString(string calldata varName, string calldata val) external returns(string memory);
    function getString(string calldata varName) external view returns (string memory);
    function setBool(string calldata varName, bool val) external returns(bool);
    function getBool(string calldata varName) external view returns (bool);
    function getUint256(string calldata varName) external view returns (uint256);
    function setUint256(string calldata varName, uint256 val) external returns(uint256);
    function getAddress(string calldata varName) external view returns (address);
    function setAddress(string calldata varName, address val) external returns (address);
}