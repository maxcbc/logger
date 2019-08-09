'use strict';
const winston = require('winston');

const {NODE_ENV} = process.env;

const DEFAULT_METADATA = {
	service: 'NOT_SET',
	env: NODE_ENV
};

const logger = module.exports = winston.createLogger({
	defaultMeta: DEFAULT_METADATA,
	transports: [
		new winston.transports.Console({
			format: winston.format.json()
		})
	]
});


logger.init = (options = {}) => {
	if (!options.service) throw new Error('\'service\' cannot be undefined');
	Object.assign(DEFAULT_METADATA, options);
	return logger;
};


