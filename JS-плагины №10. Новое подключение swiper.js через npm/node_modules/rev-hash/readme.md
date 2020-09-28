# rev-hash [![Build Status](https://travis-ci.org/sindresorhus/rev-hash.svg?branch=master)](https://travis-ci.org/sindresorhus/rev-hash)

> Create a hash for file revving

It will create an `md5` hash from an input buffer or string, and truncate it to 10 characters, which is unique enough for this purpose.

If you think you need a different hash algorithm or a longer hash, [you're wrong](http://blog.risingstack.com/automatic-cache-busting-for-your-css/).


## Install

```
$ npm install rev-hash
```


## Usage

```js
const fs = require('fs');
const revHash = require('rev-hash');

revHash(fs.readFileSync('unicorn.png'));
//=> 'bb9d8fe615'

revHash('Lorem ipsum dolor sit amet');
//=> 'fea80f2db0'
```


## API

### revHash(input)

#### input

Type: `Buffer` `string`

Data to create a hash from.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
