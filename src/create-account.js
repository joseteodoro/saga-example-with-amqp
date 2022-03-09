const db = require('./db')

const bank = process.argv[2];
db.createAccount(bank);