const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf, errors } = format;

const buildDevLogger = () => {
  const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level} : ${stack || message}`;
  });

  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      customFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' })
    ]
  })
}

module.exports = buildDevLogger;
