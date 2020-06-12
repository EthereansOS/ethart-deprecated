// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract TransferFunctionality {

    function onStart(address,address) public {
    }

    function onStop(address) public {
    }

    function transfer(address sender, uint256, address subject, address from, address to, uint256 tokenId, bool safe, bytes memory data) public {
        (,IStateHolder stateHolder,) = _checkPermmissions(sender, subject);
        require(stateHolder.getAddress(_stringConcat(_toString(tokenId), "owner", "")) == from, "Wrong Token Owner!");
        require(
            subject == from ||
            subject == stateHolder.getAddress(_stringConcat(_toString(from), "approved", _toString(tokenId))) ||
            stateHolder.getBool(_stringConcat(_toString(from), "approved", _toString(subject)))
        , "Unauthorized to transfer!");
        stateHolder.clear(_stringConcat(_toString(from), "approved", _toString(tokenId)));
        stateHolder.setAddress(_stringConcat(_toString(tokenId), "owner", ""), to);

        uint256 oldBalance = stateHolder.getUint256(_stringConcat(_toString(from), "balance", ""));
        _updateFromIndex(stateHolder, from, oldBalance, tokenId);
        stateHolder.setUint256(_stringConcat(_toString(from), "balance", ""), oldBalance - 1);

        oldBalance = stateHolder.getUint256(_stringConcat(_toString(to), "balance", ""));
        stateHolder.setUint256(_stringConcat(_toString(to), _toString(oldBalance), ""), tokenId);
        stateHolder.setUint256(_stringConcat(_toString(to), "indexOf", _toString(tokenId)), oldBalance);
        stateHolder.setUint256(_stringConcat(_toString(to), "balance", ""), oldBalance + 1);

        require(!safe || IERC721DFO(stateHolder.getAddress('token')).checkOnERC721Received(subject, from, to, tokenId, data), "Safe Fransfer Failed!");
    }

    function _updateFromIndex(IStateHolder stateHolder, address from, uint256 oldBalance, uint256 tokenId) private {
        (,bytes memory bytesData) = stateHolder.clear(_stringConcat(_toString(from), "indexOf", _toString(tokenId)));
        uint256 prevPosition = _toUint256(bytesData);
        stateHolder.clear(_stringConcat(_toString(from), _toString(prevPosition), ""));
        if(prevPosition == oldBalance - 1) {
            return;
        }
        (,bytesData) = stateHolder.clear(_stringConcat(_toString(from), _toString(oldBalance - 1), ""));
        uint256 lastToken = _toUint256(bytesData);
        stateHolder.setUint256(_stringConcat(_toString(from), _toString(prevPosition), ""), lastToken);
        stateHolder.setUint256(_stringConcat(_toString(from), "indexOf", _toString(lastToken)), prevPosition);
    }

    function _checkPermmissions(address sender, address subject) private returns (IMVDProxy proxy, IStateHolder stateHolder, IMVDFunctionalitiesManager functionalitiesManager) {
        proxy = IMVDProxy(msg.sender);
        stateHolder = IStateHolder(proxy.getStateHolderAddress());
        functionalitiesManager = IMVDFunctionalitiesManager(proxy.getMVDFunctionalitiesManagerAddress());
        require(stateHolder.getAddress('token') == sender || sender == subject, "Unauthorized Action!");
    }

    function _toUint256(bytes memory bs) private pure returns(uint256 x) {
        if(bs.length >= 32) {
            assembly {
                x := mload(add(bs, add(0x20, 0)))
            }
        }
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

interface IERC721DFO {
    function checkOnERC721Received(address subject, address from, address to, uint256 tokenId, bytes calldata _data) external returns (bool);
}