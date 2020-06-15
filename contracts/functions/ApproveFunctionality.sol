// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract ApproveFunctionality {

    function onStart(address,address) public {
    }

    function onStop(address) public {
    }

    function approve(address sender, uint256, address subject, address operator, bool forAll, bool approveForAll, uint256 tokenId) public {
        (IMVDProxy proxy,IStateHolder stateHolder,) = _checkPermmissions(sender, subject);
        if(!forAll) {
            require(stateHolder.getAddress(_stringConcat(_toString(tokenId), "owner", "")) == subject, "Not your token!");
        }
        if(forAll) {
            if(approveForAll) {
                stateHolder.setBool(_stringConcat(_toString(subject), "approved", _toString(operator)), approveForAll);
            } else {
                stateHolder.clear(_stringConcat(_toString(subject), "approved", _toString(operator)));
            }
            proxy.emitEvent("ApprovalForAll(address_indexed,address_indexed,address,address,bool)", abi.encodePacked(subject), abi.encodePacked(operator), abi.encode(subject, operator, approveForAll));
        } else {
            stateHolder.setAddress(_stringConcat(_toString(subject), "approved", _toString(tokenId)), operator);
            proxy.emitEvent("Approval(address_indexed,address_indexed,address,address,uint256)", abi.encodePacked(subject), abi.encodePacked(operator), abi.encode(subject, operator, tokenId));
        }
        IDFOBased721 dFOBased721 = IDFOBased721(stateHolder.getAddress("token"));
        if(address(dFOBased721) != address(0)) {
            dFOBased721.raiseApprovalEvent(subject, operator, forAll, approveForAll, tokenId);
        }
    }

    function _checkPermmissions(address sender, address subject) private view returns (IMVDProxy proxy, IStateHolder stateHolder, IMVDFunctionalitiesManager functionalitiesManager) {
        proxy = IMVDProxy(msg.sender);
        stateHolder = IStateHolder(proxy.getStateHolderAddress());
        functionalitiesManager = IMVDFunctionalitiesManager(proxy.getMVDFunctionalitiesManagerAddress());
        require(stateHolder.getAddress('token') == sender || sender == subject, "Unauthorized Action!");
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

interface IDFOBased721 {
    function raiseApprovalEvent(address subject, address operator, bool forAll, bool approved, uint256 tokenId) external;
}