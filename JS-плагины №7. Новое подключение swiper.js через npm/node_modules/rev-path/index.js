'use strict';
const modifyFilename = require('modify-filename');

module.exports = (pth, hash) => {
	if (!(pth && hash)) {
		throw new Error('`path` and `hash` required');
	}

	return modifyFilename(pth, (filename, ext) => `${filename}-${hash}${ext}`);
};

module.exports.revert = (pth, hash) => {
	if (!(pth && hash)) {
		throw new Error('`path` and `hash` required');
	}

	return modifyFilename(pth, (filename, ext) => filename.replace(new RegExp(`-${hash}$`), '') + ext);
};
