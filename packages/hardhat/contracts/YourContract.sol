//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
//import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract ENSContract {
	function setName(string memory newName) public {
		//do something
	}
}

contract YourContract {

	address public immutable owner = 0x34aA3F359A9D614239015126635CE7732c18fDF3;
	ENSContract public immutable ensContract = ENSContract(0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb);

	function setName(string memory newName) public {
		require(msg.sender == owner, "Only the owner can change the name");
		ensContract.setName(newName);
	}

	receive() external payable {
		//use a .call to forward eth to the owner 
		owner.call{value: msg.value}("");
	}
}
