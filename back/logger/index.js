const buildDevLogger = require("./dev-logger");
const buildProdLogger = require("./prod-logger");

let logger;

if (process.env.NODE_ENV !== 'production') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

module.exports = logger;