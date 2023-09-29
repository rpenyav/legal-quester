import { transports, createLogger, format } from 'winston';

export const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'application.log' }), // Almacena los logs en un archivo llamado application.log
  ],
});
