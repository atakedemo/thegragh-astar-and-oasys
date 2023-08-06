// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ILootAdventure {
    struct avatar {
        uint256 attack;
        uint256 defence;
        uint256 luck;
        uint256 hp;
    }
    function createAvatar(address _tbaAddress) external;

    //NFTの装備
    function addItemNft(address _tbaAddress, uint256 _slot, uint256 _tokenId) external;
    function addArmorNft(address _tbaAddress, uint256 _slot, address _nftAddress, uint256 _tokenId) external;

    //キャラクターの数値を返す
    function getAvatarPoint(address _tbaAddress) external view returns(avatar memory);
    function getAvatarAttack(address _tbaAddress) external view returns(uint256);
    function getAvatarDefence(address _tbaAddress) external view returns(uint256);
    function getAvatarLuck(address _tbaAddress) external view returns(uint256);
    function getAvatarHp(address _tbaAddress) external view returns(uint256);
}