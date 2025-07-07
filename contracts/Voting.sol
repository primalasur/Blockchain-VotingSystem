// contracts/Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public admin;
    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;

    constructor() {
        admin = msg.sender; // Admin is the address that deploys the contract
    }

    function addCandidate(string memory name) public {
        require(msg.sender == admin, "Only admin can add candidates");
        candidates.push(Candidate({name: name, voteCount: 0}));
    }

    function vote(uint candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(candidateIndex < candidates.length, "Invalid candidate.");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;
    }

    function getVoteCount(uint candidateIndex) public view returns (uint) {
        return candidates[candidateIndex].voteCount;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
