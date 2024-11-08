const productionLogger = require('./productionLogger')
let logger = null;

logger = productionLogger();

module.exports = logger;