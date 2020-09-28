'use strict';
const crypto = require('crypto');

module.exports = input => {
	if (typeof input !== 'string' && !Buffer.isBuffer(input)) {
		throw new TypeError('Expected a Buffer or string');
	}

	return crypto.createHash('md5').update(input).digest('hex').slice(0, 10);
};
