// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IItemNft {
    function getAttack(uint256 tokenId) external view returns (uint256);
    function getDefence(uint256 tokenId) external view returns (uint256);
    function getLuck(uint256 tokenId) external view returns (uint256);
    function getHp(uint256 tokenId) external view returns (uint256);
}