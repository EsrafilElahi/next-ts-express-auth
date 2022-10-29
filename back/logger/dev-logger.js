const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf, prettyPrint, errors } = format;

const buildDevLogger = () => {
  const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level} : ${message}`;
  });

  return createLogger({
    format: combine(
      format.colorize(),
      prettyPrint(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      customFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' })
    ]
  })
}

module.exports = buildDevLogger;
