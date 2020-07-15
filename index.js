'use strict';
/* eslint-disable no-console */
const {snakeCase} = require('snake-case');
const {LOG_LEVEL = 'INFO'} = process.env;

const levels = new Map([
	['ERROR', 1],
	['WARN', 2],
	['INFO', 3],
	['DEBUG', 4]
]);

const logger = module.exports = {};

for (const [levelName, levelNumber] of levels.entries()) {
	const level = levelName.toLowerCase();
	const transport = (console[level] || console.log).bind(console);

	logger[level] = (event, detail = {}) => {
		if (typeof event !== 'string') throw TypeError('event must be a string');
		if (levelNumber > levels.get(LOG_LEVEL.toUpperCase())) return;
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




