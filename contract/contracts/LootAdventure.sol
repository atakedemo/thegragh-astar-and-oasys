// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./interface/IItemNft.sol";

contract LootAdventure {
    using Strings for uint256;
    using Strings for uint16;
    using Strings for uint8;
    
    constructor() {

    }

    //キャラクターの基礎値
    struct avatar {
        uint256 attack;
        uint256 defence;
        uint256 luck;
        uint256 hp;
    }

    //呼び出し元の管理
    address itemNftAddress;
    address adminAddress;

    //トークン量の管理
    address mchcAddress;

    //キャラクターの基礎能力値
    mapping(address => avatar) public base_point;

    //Item NFT管理
    mapping(address => mapping(uint256 => uint256)) public item_nft;
    mapping(address => uint256) public item_slot;

    //装備NFT管理
    mapping(address => mapping(address => uint256)) public armor_nft;
    mapping(address => uint256) public armor_slot;

    //初期値設定 ※後で権限設定を行う
    function setItemNftAddress(address _address) public{
        itemNftAddress = _address;
    }
    function setMchAddress(address _address) public{
        mchcAddress = _address;
    }

    //イベント管理
    event settingAvatar(uint256 attack, uint256 defence, uint256 luck, uint256 hp);

    //キャラクターを作る（TBA作成時に呼び出される）
    function createAvatar(address _tbaAddress) public {
        //require(msg.sender == itemNftAddress || msg.sender == adminAddress);
        uint256 _attack = block.timestamp % 17;
        uint256 _defence = block.timestamp % 19;
        uint256 _luck = block.timestamp % 23;
        uint256 _hp = block.timestamp % 29;

        base_point[_tbaAddress].attack = _attack;
        base_point[_tbaAddress].defence = _defence;
        base_point[_tbaAddress].luck = _luck;
        base_point[_tbaAddress].hp = _hp;

        item_slot[_tbaAddress] = 11;
        armor_slot[_tbaAddress] = 6;

        emit settingAvatar(_attack, _defence, _luck, _hp);
    }

    //キャラクターにItem NFTをつける
    function addItemNft(address _tbaAddress, uint256 _slot, uint256 _tokenId) public {
        require(_slot < item_slot[_tbaAddress]);

        IERC721 _itemNft = IERC721(itemNftAddress);
        require(_itemNft.ownerOf(_tokenId)==_tbaAddress);
        item_nft[_tbaAddress][_slot] = _tokenId;

        avatar memory _avatar = getAvatarPoint(_tbaAddress);
        emit settingAvatar(_avatar.attack, _avatar.defence, _avatar.luck, _avatar.hp);
    }

    //キャラクターにArmor NFTをつける
    function addArmorNft(address _tbaAddress, uint256 _slot, address _nftAddress, uint256 _tokenId) public {
        require(_slot < armor_slot[_tbaAddress]);

        IERC721 _armorNft = IERC721(itemNftAddress);
        require(_armorNft.ownerOf(_tokenId)==_tbaAddress);
        armor_nft[_tbaAddress][_nftAddress] = _tokenId;

        avatar memory _avatar = getAvatarPoint(_tbaAddress);
        emit settingAvatar(_avatar.attack, _avatar.defence, _avatar.luck, _avatar.hp);
    }

    //キャラクターの数値を返す
    function getAvatarPoint(address _tbaAddress) public view returns(avatar memory) {
        //ItemNftの強化を反映
        uint256 _cnt = item_slot[_tbaAddress];
        avatar memory _avatar = base_point[_tbaAddress];
        uint256 _tokenId;
        IItemNft _itemNft = IItemNft(itemNftAddress);
        for (uint _slot = 0; _slot < _cnt; _slot++) {
            _tokenId = item_nft[_tbaAddress][_slot];
            _avatar.attack = _avatar.attack + _itemNft.getAttack(_tokenId);
            _avatar.defence = _avatar.defence + _itemNft.getDefence(_tokenId);
            _avatar.luck = _avatar.luck + _itemNft.getLuck(_tokenId);
            _avatar.hp = _avatar.hp + _itemNft.getHp(_tokenId);
        }

        //トークン所有量分Luckに反映
        IERC20 _mchc = IERC20(mchcAddress);
        uint256 _balance = _mchc.balanceOf(_tbaAddress) / 1000000000000000;
        _avatar.luck = _avatar.luck + _balance;
        return _avatar;
    }
    function getAvatarAttack(address _tbaAddress) public view returns(uint256) {
        uint256 _cnt = item_slot[_tbaAddress];
        uint256 _point = base_point[_tbaAddress].attack;
        uint256 _tokenId;
        IItemNft _itemNft = IItemNft(itemNftAddress);
        for (uint _slot = 0; _slot < _cnt; _slot++) {
            _tokenId = item_nft[_tbaAddress][_slot];
            _point = _point + _itemNft.getAttack(_tokenId);
        }
        return _point;
    }
    function getAvatarDefence(address _tbaAddress) public view returns(uint256) {
        uint256 _cnt = item_slot[_tbaAddress];
        uint256 _point = base_point[_tbaAddress].defence;
        uint256 _tokenId;
        IItemNft _itemNft = IItemNft(itemNftAddress);
        for (uint _slot = 0; _slot < _cnt; _slot++) {
            _tokenId = item_nft[_tbaAddress][_slot];
            _point = _point + _itemNft.getDefence(_tokenId);
        }
        return _point;
    }
    function getAvatarLuck(address _tbaAddress) public view returns(uint256) {
        uint256 _cnt = item_slot[_tbaAddress];
        uint256 _point = base_point[_tbaAddress].luck;
        uint256 _tokenId;
        IItemNft _itemNft = IItemNft(itemNftAddress);
        for (uint _slot = 0; _slot < _cnt; _slot++) {
            _tokenId = item_nft[_tbaAddress][_slot];
            _point = _point + _itemNft.getLuck(_tokenId);
        }
        //トークン所有量分Luckに反映
        IERC20 _mchc = IERC20(mchcAddress);
        uint256 _balance = _mchc.balanceOf(_tbaAddress) / 1000000000000000;
        _point= _point + _balance;
        return _point;
    }
    function getAvatarHp(address _tbaAddress) public view returns(uint256) {
        uint256 _cnt = item_slot[_tbaAddress];
        uint256 _point = base_point[_tbaAddress].hp;
        uint256 _tokenId;
        IItemNft _itemNft = IItemNft(itemNftAddress);
        for (uint _slot = 0; _slot < _cnt; _slot++) {
            _tokenId = item_nft[_tbaAddress][_slot];
            _point = _point + _itemNft.getHp(_tokenId);
        }
        return _point;
    }
    
}