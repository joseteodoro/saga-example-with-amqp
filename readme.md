# Simple SAGA example using amqp and nodejs

The banks works as the following the diagram:

![bank system diagram]([http://url/to/img.png](https://github.com/joseteodoro/saga-example-with-amqp/raw/main/images/saga-using-nodejs.png))

All the banks are listening their own queue on the broker. Everytime some transactions comes, they try to resolve it. When the transaction fail, the bank sends a compensation rolling back the transaction to the sender bank.

## How to use it

Before everything, start the rabbit:

```
./start-rabbit.sh
```

to create a bank

```
node create-bank.js <bank-name>
```

to create an account

```
node create-account.js <bank-name>
```

to transfer between accounts

```
node transfer.js <src-bank> <src-account> <target-bank> <target-account> <value>
```

You can start a batch listener using
```
node batch-bank.js <bank-name>
```