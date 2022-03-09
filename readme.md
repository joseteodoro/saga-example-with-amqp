# example using amqp and nodejs

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