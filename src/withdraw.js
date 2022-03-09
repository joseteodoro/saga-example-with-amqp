const db = require('./db')

const bank = process.argv[2];
const account = process.argv[3];
const value = parseFloat(process.argv[4]);

if (db.findAccount(bank, account)) {
    db.transact(bank, { account, value: value * -1 })
    console.log(`Withdraw processed`)
    return;
}
console.log(`Couldnt find account: ${account}.`);
