const db = require('./db')

// node ./transfer.js src-bank src-account dst-bank dst-account value

const bank = process.argv[2];
const account = process.argv[3];

db.balance(bank, account)
