const amqp = require('amqplib')

const listen = (queue, onMessage) => {
    const open = require('amqplib').connect('amqp://localhost')
    return open.then(function(conn) {
        return conn.createChannel();
      }).then(function(ch) {
        return ch.assertQueue(queue).then(function(ok) {
          return ch.consume(queue, function(msg) {
            if (msg !== null) {
              return onMessage(msg);
            }
          }, {noAck: true});
        });
      }).catch(console.warn);
}

const send = async (queue, body) => {
    const open = require('amqplib').connect('amqp://localhost')
    open.then(conn => {
        return conn.createChannel()
    })
    .then(ch => {
        return ch.assertQueue(queue)
            .then(() => {
                return ch.sendToQueue(queue, Buffer.from(JSON.stringify(body)))
            })
            .then(() => {
                return ch.close()
            })
    })
    .then(() => {
        console.log(`Published to ${queue}`)
        process.exit(0)
    })
    .catch(err => {
        console.error(`Error pushing to ${queue}. ${err}`)
    })
}

module.exports = { listen, send }