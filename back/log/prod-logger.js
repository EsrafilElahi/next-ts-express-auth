const { format, createLogger, transport, transports } = require("winston");
const { timestamp, printf, combine, errors } = format;

const buildProdLogger = () => {
  return createLogger({
    format: combine(
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' })
    ]
  })
}
