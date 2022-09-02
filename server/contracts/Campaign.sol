// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Campaign {
    event donated(
        address indexed donar,
        uint256 indexed amount,
        uint256 indexed timestamp
    );

    string public title;
    string public image;
    string public story;
    address payable public owner;
    uint256 public requiredAmount;
    uint256 public recievedAmount;

    constructor(
        string memory _title,
        uint256 _requiredAmount,
        string memory _image,
        string memory _story
    ) {
        title = _title;
        requiredAmount = _requiredAmount;
        image = _image;
        story = _story;
        owner = payable(msg.sender);
    }

    function name() public pure returns (string memory) {
        return "Campaign";
    }

    function donate() public payable {
        require(requiredAmount > recievedAmount, "required amount fullfilled");
        owner.transfer(msg.value);
        recievedAmount += msg.value;

        emit donated(msg.sender, msg.value, block.timestamp);
    }
}
