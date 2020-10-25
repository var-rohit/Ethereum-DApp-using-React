# Social Network

An ethereum smart contract decentralized application (DApp) which lets the user create social media posts and any viewer can give tip for it in cryptocurrency(ether).The rendered output always keeps the most popular post with the highest tip amount on the top.This platform will encourage the authors to write better posts as they receive recognition along with money and at the same time , viewers also a have good time reading better posts.

![Screenshot from 2020-10-26 01-38-33](https://user-images.githubusercontent.com/59581067/97117794-126c0100-172c-11eb-98e8-f3fc3c8f9de9.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

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

+ Run the command to install node modules inside the directory.

```
$ npm install

```

+ Run Ganache.
   + Setup New Workspace by browsing truffle-config.js
from the cloned directory.


+ Open Terminal.


```

$ truffle compile

$ truffle migrate


```

+ Setup metamask in Google Chrome by importing few accounts from Ganache .

+ Go to Terminal.

```
$ npm start
```
+ You will see the front end of the decentralized app up and running on your localhost.
