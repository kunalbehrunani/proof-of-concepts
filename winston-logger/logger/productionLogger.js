const winston = require('winston');

const printf = winston.format.printf;
const combine = winston.format.combine;
const label = winston.format.label;
const timestamp = winston.format.timestamp;
const colorize = winston.format.colorize;

const productionFormat = printf(({level, message, timestamp, label}) => {
    return `${label} | ${timestamp} [${level}] ===> ${message}`;
});

const productionLogger = () => {
    return winston.createLogger({
        // default level 
        level: 'info',  
        
        // format: winston.format.json(),
        format: combine(
            label({ label: '** Production Log **'}),
            colorize(),
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            productionFormat,
        ),
        
        transports: [
            // create a file error.log and log all messages in this file with level >= level['error']
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            
            // create a file combined.log and log all messages in this file with level >= level['info'] (default)
            new winston.transports.File({ filename: 'combined.log' }),

            // log all messages with level >= level['error'] into the console
            new winston.transports.Console({level: 'error'}),

            // log all messages with level >= level['info'] (default) into the console
            new winston.transports.Console()
        ],
      });
};

module.exports = productionLogger;