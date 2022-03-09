const BANKS_DIR = `${__dirname}/../banks`

const routes = require(`${BANKS_DIR}/routes.json`)

const find = (origin, destination) => {
    if (!routes.static[origin] || !routes.static[destination]) {
        // cant define a route with no compensation route for SAGA
        return []
    }
    if (routes.static[origin][destination] === 'loopback') {
        return [destination]
    }
    return (routes.static[origin][destination] || [])
}

module.exports = { find }