const SolnSquareVerifier = artifacts.require('SolnSquareVerifier')
const Verifier = artifacts.require('Verifier')
const truffleAssert = require('truffle-assertions')

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];

    describe('TestSolnSquareVerifier', function() {
        beforeEach(async function () {
            let verifierContract = await Verifier.new({from: account_one})
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: account_one})
        })
   
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it("New solution can be added for contract - SolnSquareVerifier", async function() {
            let addedSolution = await this.contract.addSolution( account_one, 99,"0xB38D4c03eBAE7333662E7eDD81414B21ef43c2dD")
            truffleAssert.eventEmitted(addedSolution, "SolutionAdded")
            assert.equal(addedSolution.logs[0].args[0], account_one);
        })

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it("ERC721 token can be minted for contract - SolnSquareVerifier", async function() {
            let CorrectProof = 
            {
                    "A":["0x28cebdaec3b4128ab83947c5ac2759bb564a679ea49acaea773176e2da420961", "0x2851b59aef8a49509f8bbf3a74e6d1a17125120c2121c878ea6ecc10c919fce0"],
                    "A_p":["0x1a38d566fac59bc6dc747141c65d8bb7933428124cd99b538ca6e5fc64a3bd77", "0x2a460264af642004bc670753a32f07e0553e90618823be663df51c6c409ec8c"],
                    "B": [["0x21a94e5f88c15dcd701c0565d46928ce4b7e09c78281c46e839fa5c761b284cf", "0x2d11087cdead1e5fea50ba2d0decfd219243720268ccbc863d64be42406c9db6"],
                     ["0x1df9f1476af8e331569d90734b0f732ee71903744eeb602c154bd396c4bd02a0", "0x199df5c60751281ffe1413684dc5d75d8031464fb7ca045fe911356fc84c2037"]],
                    
                    "B_p":["0xea0faf94a882ebd9f5a986763d906a8b1d14541531b05cafdf808c0ce1bd071", "0x1be275338b6707da7ff90a27dea38ac215f16795b9fe5bd5a05d6a0df20e3000"],
                    "C":["0x2bec1677cebf591815bde8697a802236b1c43bc394e688d1b2f644d00359e546", "0x15ddb9bd4b48594d574e98bbec6e7385dee03859bac4e3474b2bf05aed30d8b7"],
                    "C_p":["0x20b3d009b54d48f43b666e35a0d78c044a0e588b8098c0a0c42b4b5330c7604c", "0xd5903fb8d622fd846e840d268ec3c709ec2131bdf28ce836f830d49af8f7a98"],
                    "H":["0x5c693c73063bdd72b446e8db22670a11e10106d3023e3cafa5bd61df6dacb04", "0x8b354cb01af4d3c427c060f25bd4e54b886ce3429cee544b2537610ce835725"],
                    "K":["0x20074c2e3c78c8f17a6312ac820c56e09c972994756efeef3e68780936845e0e", "0x1985d63fe8193804ac380d53cda65f679f355d8dc5d31bc72d1f92c38f9a7b6e"],
            "input":[113569,1]
        }
            let result =  await this.contract.mintNewNFT.call(
                accounts[1],
                33,
                CorrectProof.A,
                CorrectProof.A_p,
                CorrectProof.B,
                CorrectProof.B_p,
                CorrectProof.C,
                CorrectProof.C_p,
                CorrectProof.H,
                CorrectProof.K,
                CorrectProof.input)
            assert.equal(result , true, "correct proof is working");
        })
    })
})