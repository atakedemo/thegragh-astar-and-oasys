// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interface/IERC6551Registry.sol";

contract ItemNFTv2 is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;
    using Strings for uint16;
    using Strings for uint8;
    
    uint256 private _tokenId;
    address public tbaAddress; //ERC6551Account.solのアドレス
    address public registoryAddress; //ERC6551Registory.solのアドレス
    address public lootAddress; //ERC6551Registory.solのアドレス

    //アイテムの項目
    struct item {
        uint256 itemType;
        uint256 attack;
        uint256 defence;
        uint256 luck;
        uint256 hp;
    }
    //アイテムの能力値
    mapping (uint256 => item) public item_point;
    
    constructor() ERC721("ItemNFT", "INFT") {
        _tokenId = 0;
    }

    //初期値設定 ※後で権限設定を行う
    function setTbaAddress(address _address) public {
        tbaAddress = _address;
    }
    function setRegistryAddress(address _address) public {
        registoryAddress = _address;
    }
    function setLootAddress(address _address) public {
        lootAddress = _address;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenId;
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    //正式リリース時はサーバーから実行でオーナーに権限を絞る
    function safeMint(uint256 token_id) public {
        _tokenId++;
        IERC6551Registry registry = IERC6551Registry(registoryAddress);
        address tba = registry.account(
            tbaAddress, 
            420,
            lootAddress,
            token_id,
            1
        );

        //能力値決定のロジック(後続フェーズであればオラクルなどを使うよう回収)
        uint256 _itemType = block.timestamp % 2;
        uint256 _attack = block.timestamp % 9;
        uint256 _defence = block.timestamp % 11;
        uint256 _luck = block.timestamp % 13;
        uint256 _hp = block.timestamp % 19;
        item_point[_tokenId].itemType = _itemType;
        item_point[_tokenId].attack = _attack;
        item_point[_tokenId].defence = _defence;
        item_point[_tokenId].luck = _luck;
        item_point[_tokenId].hp = _hp;
        _safeMint(tba, _tokenId);
    }

    function tokenURI(uint256 tokenId) override(ERC721, ERC721URIStorage) public view returns (string memory) {
        string memory image;
        if(item_point[tokenId].itemType == 0) {
            image = "https://amber-pure-kite-450.mypinata.cloud/ipfs/QmY1uhfZvG9carkFYtnQTADb6xdiQgaDQzGK74gLbcEVnR/sword.png";
        } else if(item_point[tokenId].itemType == 1){
            image = "https://amber-pure-kite-450.mypinata.cloud/ipfs/QmY1uhfZvG9carkFYtnQTADb6xdiQgaDQzGK74gLbcEVnR/ring.png";
        } else {
            image = "";
        }
        string memory c = ', ';
        string memory attributes = string(abi.encodePacked(
            '[', 
            _attribute("attack", item_point[tokenId].attack), c, 
            _attribute("defence", item_point[tokenId].defence), c, 
            _attribute("luck", item_point[tokenId].luck), c, 
            _attribute("hp", item_point[tokenId].hp), c
        ));
        attributes = string(abi.encodePacked(
            attributes, 
            _attribute("type", item_point[tokenId].itemType), 
            ']'
        ));

        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Loot Adventure Item #', _tokenId.toString(), 
            '", "description": "Lets Fight", "attributes": ', attributes ,
            ', "image": "', image, 
            '"}'
        ))));
        json = string(abi.encodePacked('data:application/json;base64,', json));
        return json;
    }


    function _attribute(string memory traitType, string memory value) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType, '", "value": "', value, '"}'));
    }

    function _attribute(string memory traitType, uint256 value) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType, '", "value": ', value.toString(), '}'));
    }

    function getAttack(uint256 tokenId) public view returns (uint256) {return item_point[tokenId].attack;}
    function getDefence(uint256 tokenId) public view returns (uint256) {return item_point[tokenId].defence;}
    function getLuck(uint256 tokenId) public view returns (uint256) {return item_point[tokenId].luck;}
    function getHp(uint256 tokenId) public view returns (uint256) {return item_point[tokenId].hp;}
    
}
