# dao-deploy

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Cast Scripts

`cast` is a cli tool part of the foundry toolkit, it allows you to read and write to smart contracts from the cli. If you have foundry installed then you are ready to rock and roll

copy `.cast.example` to `.cast`

```bash
cp .cast.example .cast
```

then add these variables to the top of the file

```bash
PK= #YOUR_PRIVATE_KEY
GOERLI_RPC= #YOUR RPC
ME= # YOUR ADDRESS
```

then running the following commands

### load the environment variables

```
source .cast
```

### mint you some test USDC

```
$(send) $USDC $MINT $ME 420000000000000000000 $(GOERLI)
```

### approve the vault to spend your USDC

```
$(send) $USDC $APPROVE $VAULT 420000000000000000000 $(GOERLI)
```

### deposit your USDC minting you some vault tokens

```
$(send) $VAULT $DEPOSIT 420000000000000000000 $ME $(GOERLI)
```

then go to the DAO and see your deposit there
https://app.aragon.org/#/daos/goerli/the-internet-confederation-test-23423423.dao.eth/dashboard
