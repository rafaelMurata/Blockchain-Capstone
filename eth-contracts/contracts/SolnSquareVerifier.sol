pragma solidity ^0.5.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is Verifier, RealEstateRMERC721Token {

    Verifier contractVerifier;

    constructor( 
                address contractAddress  
                )  
                public
    {
         contractVerifier = Verifier(contractAddress);
    }

// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint _index;
        address _address;
    }


// TODO define an array of the above struct

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutions;



// TODO Create an event to emit when a solution is added
    event SolutionAdded(address solution);



// TODO Create a function to add the solutions to the array and emit the event
   function addSolution(address _address, uint256 _index, bytes32 solutionHash) public {
        solutions[solutionHash] = Solution({
                                        _index: _index,
                                        _address: _address
                                });
         emit SolutionAdded(_address);
    }



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  function mintNewNFT(address _address, uint _index,
             uint[2] memory a,
             uint[2] memory a_p,
             uint[2][2] memory b,
             uint[2] memory b_p,
             uint[2] memory c,
             uint[2] memory c_p,
             uint[2] memory h,
             uint[2] memory k,
             uint[2] memory input
        ) public returns (bool) {

        require(verifyTx(a, a_p,b, b_p, c, c_p, h, k, input), "solution is not val_index");
        bytes32 solutionHash = keccak256(abi.encodePacked(a, a_p,b, b_p, c, c_p, h, k, input));
        require(solutions[solutionHash]._address == address(0), "The solution was previously used.");
        addSolution(_address,_index,solutionHash);
        return mint(_address, _index);
    }

}


























