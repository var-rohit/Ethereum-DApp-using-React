# Social Network

An ethereum smart contract decentralized application (DApp) which lets the user create posts and tip each one of them.The renderd output always keeps the most popular post with the highest tip amount on the top.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

+ Install Node.js

```
$ sudo apt install nodejs

```


In most cases, you’ll also want to also install npm, the Node.js package manager as it will help you in installing 	Truffle (a development environment, testing framework and asset pipeline for Ethereum )

+ Install npm

```
$ sudo apt install npm
```

+ Install Truffle

```
$ sudo npm install -g truffle
```

+ Download Ganache

A Private blockchain for development and testing purposes.The below link will have an AppImage file (a format for distributing portable software on Linux without needing superuser permissions to install the application)


<https://github.com/trufflesuite/ganache/releases>

+ Download Metamask chrome extension

An ethereum wallet which lets you do transactions on blockchain network.

<https://metamask.io/>

+ Install React

A JavaScript library for building user interfaces.

```
$ npm install -g create-react-app
```

### Installing

A step by step guide to get everything up and running.

+ Clone the repository and go inside the directory.

+ Run Ganache.
1. Setup New Workspace by browsing truffle-config.js
from the cloned directory.

2. Open Terminal.


```
$ truffle migrate


```

3. Setup metamask in Google Chrome by importing few accounts from Ganache .

4. Go to Terminal.

```
$ npm start
```
5. You will see the front end of the decentralized app up and running on your localhost.
