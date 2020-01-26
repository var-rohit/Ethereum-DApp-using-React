const SocialNetwork = artifacts.require("./SocialNetwork.sol");

require('chai')
	.use(require('chai-as-promised'))
	.should()

//all test inside it
/*Out of the 10 accounts that Ganache provides
deployer is first,author is the second and
tipper is the third  ganache account
*/
contract('SocialNetwork',async ([deployer,author,tipper]) => {
	let socialNetwork
	let result,postCount

	before(async () => {
		socialNetwork = await SocialNetwork.deployed()

	})

	describe('deployment',async () => {
		it('deploys successfully', async () =>{
			const address = await socialNetwork.address
			assert.notEqual(address,'OxO')
			assert.notEqual(address,'')
			assert.notEqual(address,null)
			assert.notEqual(address,undefined)
		})
	})

	describe('posts',async() =>{

		before (async() => {
			//we have optional arguments
			result = await socialNetwork.createPost('1st post',{from:author})
			postCount = await socialNetwork.postCount()

		})

		it('creates post',async() =>{

			//success
			assert.equal(postCount,1)

			//failure
			await socialNetwork.createPost('',{from : author}).should.be.rejected;
		})

		it('lists post',async() =>{
				const post = await socialNetwork.posts(postCount)
				assert.equal(post.id.toNumber(),postCount.toNumber())
		})

		it('allow users to tip post',async() =>{

			    let oldAuthorBalance,newAuthorBalance

				oldAuthorBalance = await web3.eth.getBalance(author)
				oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

				result = await socialNetwork.tipPost(postCount,{from :tipper , value : web3.utils.toWei('1','Ether')})
				//console.log(result)
				newAuthorBalance = await web3.eth.getBalance(author)
				newAuthorBalance = new web3.utils.BN(newAuthorBalance)

			     const event = result.logs[0].args
				 //console.log(event)
				 assert.equal(event.id.toNumber(),postCount.toNumber())
				 assert.equal(event.tipAmount,web3.utils.toWei('1','Ether'))

				 let tipAmount

				 tipAmount = await web3.utils.toWei('1','Ether')
				 tipAmount = new web3.utils.BN(tipAmount)

				 const expectedBalance = oldAuthorBalance.add(tipAmount)

				 assert.equal(expectedBalance.toString(),newAuthorBalance.toString())
				 

		})
	})


})
