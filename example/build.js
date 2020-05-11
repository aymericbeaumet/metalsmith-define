#!/usr/bin/env node

const metalsmith = require('metalsmith');
const metalsmithDefine = require('..');

metalsmith(__dirname)
	.use(
		metalsmithDefine({
			env: process.env
		})
	)
	.build(error => {
		if (error) {
			throw error;
		}
	});
