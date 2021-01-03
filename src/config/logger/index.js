const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
  prettyPrint: {
    colorize: true, // --colorize
    timestampKey: 'time', // --timestampKey
    translateTime: true, // --translateTime
    ignore: 'pid,hostname', // --ignore,
  },
});

const expressLogger = expressPino({ logger });

module.exports = { logger, expressLogger };
