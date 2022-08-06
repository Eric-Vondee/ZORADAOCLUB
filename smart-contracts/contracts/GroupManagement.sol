//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721Drop {
    function purchase(uint256 quantity) external payable returns (uint256);

    function balanceOf(address owner) external view returns (uint256);
}

contract GroupManagement is ERC20, Ownable {
    event NewDeposit(address user, uint256 quantity, address token);
    event NewMint(address user, uint256 quantity);
    event NewBurn(address user, uint256 quantity);
    event NewNFTAddress(address _nftAddress);

    address public depositToken;
    uint256 public depositEndDate;
    uint256 public maxMember;
    uint256 public depositLimit;
    uint256 public maxMembers;
    address public treasureAddress;
    IERC721Drop public _erc721address;

    constructor(
        string memory _groupName,
        string memory _groupSymbol,
        address _depositToken,
        uint256 _depositEndDate,
        uint256 _depositLimit,
        uint256 _maxMembers,
        address _treasureAddress,
        address _contractOwner
    ) ERC20(_groupName, _groupSymbol) {
        depositToken = _depositToken;
        depositEndDate = _depositEndDate;
        depositLimit = _depositLimit;
        maxMembers = _maxMembers;
        treasureAddress = _treasureAddress;
        transferOwnership(_contractOwner);
    }

    modifier canAddDeposit() {
        require(depositEndDate > block.timestamp, "deposit ended");
        _;
    }

    // add Asset

    function addDeposit(uint256 _depositAmount) public payable canAddDeposit {
        if (depositToken == address(0)) {
            require(depositLimit >= msg.value, "deposit amount error");
            payable(treasureAddress).transfer(msg.value);
            _mint(msg.sender, 100 * decimals());
            emit NewDeposit(msg.sender, msg.value, address(0));
        } else {
            require(depositLimit >= _depositAmount, "deposit amount error");
            IERC20 token = IERC20(depositToken);
            token.transferFrom(msg.sender, treasureAddress, _depositAmount);
            _mint(msg.sender, 100 * decimals());
            emit NewDeposit(msg.sender, _depositAmount, depositToken);
        }
    }

    function mintTokenTo(address _toWallet, uint256 _quantity)
        public
        onlyOwner
    {
        _mint(_toWallet, _quantity);
        emit NewMint(_toWallet, _quantity);
    }

    function burnTokenTo(address _toWallet, uint256 _quantity)
        public
        onlyOwner
    {
        _burn(_toWallet, _quantity);
        emit NewBurn(_toWallet, _quantity);
    }

    function setDepositLimit(uint256 _depositLimit) public onlyOwner {
        depositLimit = _depositLimit;
    }

    function setDepositEnDate(uint256 _depositEndDate) public onlyOwner {
        depositEndDate = _depositEndDate;
    }

    function mintNft(uint256 quantity) external payable returns (uint256) {
        require(balanceOf(msg.sender) >= 100 * decimals(), "Not a member");
        transferFrom(msg.sender, address(this), 100 * decimals());
        uint256 firstMintedTokenId = IERC721Drop(_erc721address).purchase(
            quantity
        );
        return firstMintedTokenId;
    }

    function updateNftAddress(address _nftAddress) external onlyOwner {
        _erc721address = IERC721Drop(_nftAddress);
        emit NewNFTAddress(_nftAddress);
    }

    function claimToken() external {
        require(
            IERC721Drop(_erc721address).balanceOf(msg.sender) >= 1,
            "No Nft found"
        );
        transfer(msg.sender, 100 * decimals());
    }
}
