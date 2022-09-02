// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./Campaign.sol";

contract CampaignFactory {
    event campaignCreate(
        string title,
        uint256 requiredAmount,
        address indexed owner,
        address campaign,
        string image,
        uint256 indexed timestamp,
        string indexed category
    );

    address[] public campaigns;

    function name() public pure returns (string memory) {
        return "CampaignFactory";
    }

    function createCampaign(
        string memory _title,
        uint256 _requiredAmount,
        string memory _image,
        string memory _story,
        string memory _category
    ) public {
        Campaign campaign = new Campaign(
            _title,
            _requiredAmount,
            _image,
            _story
        );
        campaigns.push(address(campaign));
        emit campaignCreate(
            _title,
            _requiredAmount,
            msg.sender,
            address(campaign),
            _image,
            block.timestamp,
            _category
        );
    }
}
