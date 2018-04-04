#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
log4js.configure(process.env.LOG4JS_CONFIG || path.resolve(__dirname, 'log4js.json'));
const logger = log4js.getLogger();
const exportJwks = require('..');

const argv = require('yargs')
	.demandCommand(1, 1)
	.help()
	.argv;


fs.readFile(argv._[0], 'utf8', (err, data) => {
	if (err) {
		logger.error(err.message);
		return process.exit(1);
	}
	try {
		const jwks = JSON.parse(data);
		return process.stdout.write(JSON.stringify(exportJwks(jwks)));
	} catch (jsonErr) {
		logger.error(jsonErr.message);
		return process.exit(1);
	}
});


