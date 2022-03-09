const db = require('./db')

// node ./transfer.js src-bank src-account dst-bank dst-account value

const bank = process.argv[2];
const account = process.argv[3];
const destinationBank = process.argv[4];
const destinationAccount = process.argv[5];
const value = process.argv[6];
const queue = require('./queue')
const findRoute = require('./find-route')

if (db.findAccount(bank, account)) {
    db.transact(bank, { account, value: value * -1, destinationAccount, destinationBank })
    const route = findRoute.find(bank, destinationBank)
    const trx = { value, sourceBank: bank, sourceAccount: account, route, destinationAccount, destinationBank}
    queue.send(destinationBank, trx)
    console.log(`Transaction processed:`, trx)
    return;
}
console.log(`Couldnt find account: ${account}.`);
