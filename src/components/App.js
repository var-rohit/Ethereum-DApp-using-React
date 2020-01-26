import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar';
import SocialNetwork from '../abis/SocialNetwork.json';
import Main from './Main';


class App extends Component {

     componentDidMount(){
         this.loadWeb3()
         this.loadBlockChainData()
    }

 async setStateContract(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({  account : accounts[0] })
    //fetch networkId
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    //console.log(networkId)
    //fetch address
    if(networkData)
    {
       const socialNetwork = await web3.eth.Contract(SocialNetwork.abi,networkData.address)
       //console.log(socialNetwork)
       this.setState({    socialNetwork : socialNetwork })  //left side is constructor's socialNetwork
   }
   else {
       window.alert('SocialNetwork contract is not deployed to detected network')
   }
}

  loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
       window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async getPostsOnCreation(){

      await this.setStateContract()

      const postCount = await this.state.socialNetwork.methods.postCount().call()
      this.setState({postCount: postCount })

          const post = await this.state.socialNetwork.methods.posts(postCount).call()
          this.setState({
              posts : [...this.state.posts,post]
          })

  }

  async loadBlockChainData(){

         await this.setStateContract()
         const postCount = await this.state.socialNetwork.methods.postCount().call()
         console.log("1 time "+postCount)
         this.setState({postCount: postCount })

         for(var i = 1;i<=postCount;i++)
         {
             const post = await this.state.socialNetwork.methods.posts(i).call()
             this.setState({
                 posts : [...this.state.posts,post]
             })
         }

         this.setState({
             posts : this.state.posts.sort((a,b)=> b.tipAmount - a.tipAmount )
         })
                // console.log({posts : this.state.posts})
          this.setState({ loading : false })

  }

  createPost = async (content) => {
      this.setState({ loading : true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account },
    async  (err,txh)=> {
       if(err)
       {
           console.log(err)
       }
       else {
           console.log(txh)
           await this.getPostsOnCreation()
           await console.log("creatingPost "+this.state.postCount)
           this.setState({ loading : false })

       }
   })

 }

 tipPost = async (id,tipAmount) => {
     this.setState({ loading : true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account , value : tipAmount},
       async  (err,txh)=> {
          if(err)
          {
              console.log(err)
          }
          else {
              console.log(txh)
              window.location.reload();           //Working on it
              this.setState({ loading : false })
          }
      } )

}



  constructor(props)
  {
      super(props)
      this.state = {
          account : '',
          socialNetwork : null,
          postCount : 0,
          posts : [],
          loading : true
      }


  }

  render() {
    return (
      <div>
        <Navbar account = {this.state.account}/>
     {this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            :
            <Main
            posts = {this.state.posts}
            createPost={this.createPost}
            tipPost={this.tipPost}
            />
         }
        </div>
    );
  }
}

export default App;
