const db = require('./db')
const bank = process.argv[2];
const queue = require('./queue')

const onMessage = msg => {
    const content = msg.content.toString()
    const {  account, value = 0, sourceBank, sourceAccount } = JSON.parse(content)
    if (db.findAccount(bank, account)) {
        db.transact(bank, { account, value: parseInt(value, 10), sourceBank, sourceAccount })
        console.log(`Transaction processed: ${content}`)
        process.exit(0)
    }
    console.log(`Couldnt find account: ${account}. Sending value back for source`);
    queue.send(sourceBank, { account: sourceAccount, value })
    process.exit(0)
}

queue.listen(bank, onMessage)