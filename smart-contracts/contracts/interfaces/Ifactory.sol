//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IFactory {
    event NewGroup(
        address groupAddress,
        address owner,
        string groupName,
        string groupSymbol,
        address depositToken,
        uint256 depositEndDate,
        uint256 depositLimit,
        uint256 maxMembers,
        address treasureAddress
    );

    function createGroup(
        address[] memory _gnosisowners,
        string memory _groupName,
        string memory _groupSymbol,
        address _depositToken,
        uint256 _depositEndDate,
        uint256 _depositLimit,
        uint256 _maxMembers
    ) external returns (address pool, address safe);
}
