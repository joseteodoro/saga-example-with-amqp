const db = require('./db')
const bank = process.argv[2];
const queue = require('./queue')

console.log(`Starting batch processing for ${bank}`)

const onMessage = msg => {
    const content = msg.content.toString()
    const {  destinationAccount: account, value = 0, sourceBank, sourceAccount } = JSON.parse(content)
    if (db.findAccount(bank, account)) {
        db.transact(bank, { account, value: parseInt(value, 10), sourceBank, sourceAccount })
        console.log(`Transaction processed: ${content}`)
    } else {
        console.log(`Couldnt find account: ${account}. Sending value back for source`);
        queue.send(sourceBank, { destinationAccount: sourceAccount, value })
    }
}

queue.listen(bank, onMessage)