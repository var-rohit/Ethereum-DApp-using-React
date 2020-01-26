pragma solidity >=0.5.0 <0.6.0;

contract SocialNetwork{

	string public name;  //when declared public compiler will generate a function called name
	uint public postCount = 0;

	struct Post{
		uint id;
		string content;
		uint tipAmount;
		address payable author;
	}

	event PostCreated(
		uint id,
		string content,
		uint tipAmount,
		address payable author
	);

	event PostTipped(
		uint id,
		string content,
		uint tipAmount,
		address payable author
	);

	mapping(uint => Post) public posts;
	//called when contract is initialised
	//need to be public
	constructor() public {
		name = "Social Network";
	}

	//write function costs gas fee
	function createPost(string memory _content) public {

		require(bytes(_content).length > 0);
		++postCount;
		posts[postCount] = Post(postCount,_content,0,msg.sender);
		emit PostCreated(postCount,_content,0,msg.sender);
	}

	//need to make it payable as this function accepts ether
	function tipPost(uint _id) public payable{

		require(_id > 0 && _id <= postCount);
		//fetch the post
		Post memory _post = posts[_id];
		//fetch the author
		address payable _author = _post.author;
		//pay the author
		address(_author).transfer(msg.value);
		//increment the tipAmount of author
		_post.tipAmount = _post.tipAmount + msg.value;
		//update the post
		posts[_id] = _post;
		//trigger the event
		emit PostTipped(postCount,_post.content,msg.value,msg.sender);
	}
}
