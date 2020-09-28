[![Version](https://img.shields.io/npm/v/gulp-tinypng-compress.svg)][npm]
[![Downloaded](https://img.shields.io/npm/dm/gulp-tinypng-compress.svg)][npm]
[![Build](https://img.shields.io/travis/stnvh/gulp-tinypng-compress.svg)][travis]

# gulp-tinypng-compress

> [TinyPNG](https://tinypng.com) API wrapper for compressing PNG & JPG images

An actively maintained & developed fork of [gulp-tinypng](https://github.com/creativeaura/gulp-tinypng).

*Main differences from gulp-tinypng:*
- File signature checking (to minimise unnecessary API calls, optional)
- No temporary files/folders are created on compressed image download - fed straight from tinypng to the pipe
- Maintained with the intention of standardising the tinypng featureset across gulp & grunt (and others too!)

## Install
*Requires node `0.10.x` or above*

Install with [npm](https://npmjs.org/package/gulp-tinypng-compress) - In your project folder, run:

```
npm install gulp-tinypng-compress
```

To run tests:

```
npm test
```

## Example

```js
var gulp = require('gulp');
var tinypng = require('gulp-tinypng-compress');

gulp.task('tinypng', function () {
	gulp.src('images/src/**/*.{png,jpg,jpeg}')
		.pipe(tinypng({
			key: 'API_KEY',
			sigFile: 'images/.tinypng-sigs',
			log: true
		}))
		.pipe(gulp.dest('images'));
});
```

## API

### tinypng([options])

Returns Stream containing compressed images

#### options
Type: `Object` / `String`
Default: `false`

Sets options described below from its properties. If type is not object, string presumed (the API key)

#### options.key
Type: `String`
Default: `''`

Your TinyPNG API key to use for requests

#### options.sigFile
Type: `String`
Default: `''`

If set to a filename, it will compare existing source file md5 signatures against those found in the file's json data. When the signatures match, the file is skipped from being minified again, allowing you to better stay within your API request limits. When an image is minified, the md5 signature is determined from the unminified source image and written to the file at options.sigFile (a suggested location would be somewhere under your source control).

Signatures are based off the unminified source image, so that when the source changes it will be re-minified and re-written to the destination file.

#### options.sameDest
Type: `Boolean`
Default `false`

If your source is the same as your destination (images are written over themselves), and you want to use the signature checking feature, set this to true

>**Note:** If your source and destination are the same, it's recommended you use this, and `options.sigFile`, as it prevents you from continually uploading already compressed images each time you run the task

#### options.summarize/summarise
Type: `Boolean`
Default: `false`

Outputs statistics once all images have been handled.
```bash
[09:47:43] gulp-tinypng-compress Skipped: 0 images, Compressed: 1 image, Savings: 3.98 KB (ratio: 0.4109)
```

#### options.log
Type: `Boolean`
Default: `false`

Set to true to log errors & messages to the console. Errors are dispatched via events anyway, so plugins like `gulp-plumber` can handle these for you.

#### options.parallel
Type: `Boolean`
Default: `true`

Enables concurrent uploads to the TinyPNG server to speed up total compression time.

<sub>(thanks [HugoHeneault](https://github.com/HugoHeneault) for this feature suggestion)</sub>

#### options.parallelMax
Type: `Integer`
Default: `5`

The amount of concurrent uploads allowed at one time, increase if you/your request limits can handle it - very easy to max out your monthly requests, use with caution!

#### options.force
Type: `Boolean` / `String`
Default: `false`

Force compress images regardless of signature. Value can either be `true` to force all images, or a glob pattern string to match against the filename(s).

Can also be performed from the **command line**:
```bash
$ gulp png --forceupload 'icon-*.png'
```

This feature was added as it's impossible to know where the files are being written to at this point in the stream, unless the directory is directly passed into the config (pretty ugly). So the option was added to force certain (or all) files to be compressed when required.

#### options.ignore
Type: `Boolean` / `String`
Default: `false`

Same as `options.force` except ignores files if the glob is matched

`--ignore` flag on the command line

### Deprecated/non-functional options

**options.checkSigs** - Removed in favor of `options.sigFile`


## License

MIT © Stan Hutcheon - Bigfork Ltd.

**Original license:**

>MIT © [Gaurav Jassal](http://gaurav.jassal.me)

[npm]: https://www.npmjs.com/package/gulp-tinypng-compress
[travis]: https://travis-ci.org/stnvh/gulp-tinypng-compress
