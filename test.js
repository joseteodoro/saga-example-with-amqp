const findRoute = require('./src/find-route')

console.log('from itau to c6', findRoute.find("itau", "c6"))
console.log('from bb to c6', findRoute.find("bb", "c6"))
console.log('from c6 to bb', findRoute.find("c6", "bb"))