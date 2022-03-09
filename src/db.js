const fs = require('fs');
const uuidv5 = require('uuid').v4;

const BANKS_DIR = `${__dirname}/../banks`

const seeder = require(`${BANKS_DIR}/seeder.json`);

const con = (bank) => {
    const dbFile = `${BANKS_DIR}/${bank}.json`;
    if (!fs.existsSync(dbFile)) {
        fs.writeFileSync(dbFile, JSON.stringify(seeder));
    }
    return require(dbFile);
}

const save = (bank, { account, transaction, message } = {}) => {
    const { accounts: acc, transactions: trx, messages: msg} = con(bank);
    const dbFile = `${BANKS_DIR}/${bank}.json`;
    fs.writeFileSync(dbFile, JSON.stringify({
        accounts: account ? acc.concat(account) : acc,
        transactions: transaction ? trx.concat(transaction) : trx,
        messages: message ? msg.concat(message) : msg,
    }));
}

const createAccount = (bank) => {
    const accountUuid = uuidv5();
    save(bank, { account: { uuid: accountUuid } });
    console.log(`account created: ${accountUuid}`);
}

const addMessage = (bank, message) => {
    save(bank, { message });
}

const transact = (bank, { account, value }) => {
    save(bank, { transaction: { account, value } });
}

const balance = (bank, uuid) => {
    const accountBalance = con(bank).transactions.filter(({account}) => uuid === account)
        .reduce((acc, { value }) => acc + value, 0.0);
    console.log(`Balance for ${uuid} is ${accountBalance}`)
}

const balances = (bank) => {
    return con(bank).accounts.map(({uuid}) => balance(bank, uuid))
}

const findAccount = (bank, account) => con(bank).accounts.find(({uuid}) => uuid === account)

module.exports = { createAccount, addMessage, transact, save, balance, findAccount, balances }
