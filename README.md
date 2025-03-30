# CLOUD DE-FI

This project attempts to create a De-Fi app that runs on the cloud.


## Installation

Install project with npm

```bash
  git clone https://github.com/harikrishnan-git/Cloud_De-Fi
  cd Cloud_De-Fi
  npm install
```

## Build
Builds artifacts and cache needed to run the contracts.
```bash
  npx hardhat compile
```

## Test
Test working of smart contracts.
```bash
  npx hardhat test
```

## Deploy
Deploy the smart contracts.
```bash
  npx hardhat ignition depoy ./ignition/modules/TokenFarmModule.js
```

## Frontend
Install the frontend dependencies and run it
```bash
  cd script
  npm install
  npm run dev
```
