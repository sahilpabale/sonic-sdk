<p align="center">
    <a href="https://0xsonic.vercel.app" target="_blank">
    <h1>@0xsonic/sdk</h1></a>
    <b>Sonic SDK enables you to quickly setup and integrate your decentralized community in a flash!</b>
    <br />
</p>

[![NPM Package](https://badgen.net/npm/v/@0xsonic/sdk)](https://npmjs.com/@0xsonic/sdk)
[![NPM Downloads](https://badgen.net/npm/dt/@0xsonic/sdk)](https://npmjs.com/@0xsonic/sdk)
[![Stars](https://badgen.net/github/stars/sahilpabale/sonic-sdk)](https://github.com/sahilpabale/sonic-sdk)
[![License](https://badgen.net/github/license/sahilpabale/sonic-sdk)](LICENSE)

Table of Contents:
- [Getting Started](#📦-getting-started)
  - [Installation](#installation)
    - [NPM](#npm)
    - [Yarn](#yarn)
    - [PNPM](#pnpm)
  - [Usage](#usage)
- [Features](#⭐️-features)
- [Support](#🚀-support)
- [Contributing](#✅-contributing)
- [Builders](#👨🏻‍💻-builders)
- [License](#📄-license)

## 📦 Getting Started
### Installation
Install Sonic SDK using any npm package provider.
#### NPM
```bash
npm install @0xsonic/sdk
```
#### Yarn
```bash
yarn add @0xsonic/sdk
```
#### PNPM
```bash
pnpm install @0xsonic/sdk
```

### Usage
React-js Application:
```js
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SonicProvider } from '@0xsonic/sdk';

// ...

root.render(
  <React.StrictMode>
    <SonicProvider> // wrap around your react app component
      <App />
    </SonicProvider>
  </React.StrictMode>
);
```

```js
// src/App.js

import React from 'react';
import { Sonic } from '@0xsonic/sdk';

function App() {
  return (
    <>
      <Blog/>
      <Sonic context="blog-related-context"/> // enables decentralised comments for your dapp
    </>
  );
}

export default App;
```

## ⭐️ Features
1. `<SonicProvider />`
   <br />SonicProvider wrapper helps us to manage the states and connection with Orbis & Ceramic protocol under the hood.
2. `<Sonic context=""/>`
   <br />Sonic is the main plug-&-play comments widget that dApps can use to integrate decentralised comments feature with 0 headache.
3. `<SonicForum />`
   <br />WIP 🏗 A easy to use forums widget for all Web3ians
4. `<SonicChat />`
   <br />WIP 🏗 Another quick, plug-&-play chat widget for dApps, dGames

## 🚀 Support
| Framework      | Version     |
| :----:         | :----:      |
| react-js       | 0.2.5 ✅    |
| next-js        | 0.3.0 🏗    |
| react-ts       | 0.3.5 🏗    |
| next-ts        | 0.4.0 🏗    |
| vue            | 0.5.0 🏗    |
| svelte         | 0.6.0 🏗    |

We plan to release these major versions and support all the leading web frameworks in coming months.
## ✅ Contributing

All code contributions, including those of people having commit access, must go through a pull request and be approved by a core developer before being merged. This is to ensure a proper review of all the code.

We truly ❤️ pull requests! If you wish to help, we will soon be making our sdk ready to be contribute post hackathon, and we'll do a proper announcement for everyone to contribute.

## 👨🏻‍💻 Builders

[![Twitter](https://badgen.net/twitter/follow/sahilpabale)](https://twitter.com/SahilPabale)
[![Twitter](https://badgen.net/twitter/follow/AnishDe12020)](https://twitter.com/AnishDe12020)

## 📄 License

This repository is available under the [MIT License](./LICENSE).