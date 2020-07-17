'use strict';
/* eslint-disable no-console */
const {snakeCase} = require('snake-case');
const {LOG_LEVEL = 'INFO'} = process.env;

const levels = new Map([
	['NONE', 0],
	['ERROR', 1],
	['WARN', 2],
	['INFO', 3],
	['DEBUG', 4]
]);

module.exports = {
	error: createLogger('ERROR', console.error.bind(console)),
	warn: createLogger('WARN', console.warn.bind(console)),
	info: createLogger('INFO', console.info.bind(console)),
	debug: createLogger('DEBUG', console.debug.bind(console))
};

function createLogger (levelName, transport) {
	return (event, detail = {}) => {
		if (typeof event !== 'string') throw TypeError('event must be a string');
		if (levels.get(levelName) > levels.get(LOG_LEVEL.toUpperCase())) return;
		const statement = {
			event: snakeCase(event).toUpperCase(),
		};
		if (detail && detail instanceof Error) {
			statement.detail = {
				message: detail.message,
				stack: detail.stack
			};
			if (detail.code) statement.detail.code = detail.code;
		} else if (detail) {
			statement.detail = detail;
		}
		transport(statement);
	};
}



