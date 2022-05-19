var ERC721MintableComplete = artifacts.require('RealEstateRMERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
        this.contract = await ERC721MintableComplete.new({from: account_one});
            // TODO: mint multiple tokens
            for(var index = 10; index < 17; index++) {
                await this.contract.mint(accounts[index], index);
            }
        })

        it('should return total supply', async function () { 
            let supply  = await this.contract.totalSupply.call()
            assert.equal(supply, 7,"supply is not correct");
        })

        it('should get token balance', async function () { 
                let balance = await this.contract.balanceOf(accounts[10])
                assert.equal(balance, 1,"balance is correct")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(10)
            assert.equal(uri, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/10')
        })

        it('should transfer token from one owner to another', async function () { 
            let account11=  await this.contract.ownerOf(11);
            let account12=  await this.contract.ownerOf(12);
            
            await this.contract.transferFrom(account11,account12,11, {from: account11});
           
           let newOwner = await this.contract.ownerOf(11);
            assert.equal(newOwner, account12, "new owner is not correct");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let fail = false;
            try {
                await this.contract.mint(accounts[13], 13, { from: account_two });
            } catch (e) {
                fail = true;
            }
            assert.equal(fail, true, "is not contract owner");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call({from: account_one});
            assert.equal(owner, account_one, "contract owner is correct");
        })

    });
})