// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MCHC is ERC20 {
    constructor() ERC20("MCH Coin", "MCHC") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
