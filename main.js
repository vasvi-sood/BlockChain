let BlockChain =require ("./blockchain/blockchain");
let hash = require("object-hash");
let blockChain=new BlockChain();

const PROOF = 1560; ///< Random Proof Number 

//Check if the Proof is Valid
let validProof = (proof) => {
  let guessHash = hash(proof); ///< hash the proof
  console.log("Hashing: ", guessHash);
  return guessHash == hash(PROOF); ///< check against the real proof hash
};

let proofOfWork = () => {
  let proof = 0;
  //Loop till you get into the real proof
  while(true) {
    //check proof (Not valid, increment)
    if(!validProof(proof)) {
      proof++;
    } else {
      //We have got the proof, get out of the infinite loop;
      break;
    }
  }
  //Send Proof Back 
  return proof;
}
if (proofOfWork() == PROOF) {
    //if first block on chain (Previous hash is NULL)
    let prevHash = blockChain.lastBock() ? blockChain.lastBock().hash : null;
    //New Transactions 
    blockChain.addNewTransaction("islem", "penywis", 560);
    //Add Block
    blockChain.addNewBlock(prevHash);
}

//Log Our Chain after block adding 
console.log("Chain: ", blockChain.chain);