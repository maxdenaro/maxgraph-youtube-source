var assert = require('assert');
var File = require('vinyl');
var revDel = require('..');

//TODO: exclude: function vs regex

describe('gulp-rev-delete-original', function() {

  it('should not remove the original file when it has not been rewritten', function(done) {
    var removeWasCalled = false;

    var file = new File({
      cwd: '/',
      base: '/test/',
      path: '/dist/index.js',
      contents: new Buffer('')
    });
    file.revOrigPath = '/dist/index.js';

    var stream = revDel({remove: function(path, callback) {
      assert(false);
    }});

    stream.on('data', function() {
      done();
    });

    stream.write(file);

  });

  it('should remove the original original file when it has been rewritten', function(done) {
    var removeWasCalled = false;

    var file = new File({
      cwd: '/',
      base: '/test/',
      path: '/dist/index.abcd.js',
      contents: new Buffer('')
    });
    file.revOrigPath = '/dist/index.js';

    var stream = revDel({remove: function(path, callback) {
      removeWasCalled = true;

      //make sure we're removing the ORIGINAL file
      assert.equal(path, file.revOrigPath);

      callback(null);
    }});

    stream.on('data', function() {

      //make sure we removed a file
      assert(removeWasCalled);

      done();
    });

    stream.write(file);

  });

  it('should remove the original file when it has been rewritten and has not been excluded', function(done) {
    var removeWasCalled = false;

    var file = new File({
      cwd: '/',
      base: '/test/',
      path: '/dist/index.abcd.js',
      contents: new Buffer('')
    });
    file.revOrigPath = '/dist/index.js';

    var stream = revDel({

      exclude: function() {
        return false
      },

      remove: function(path, callback) {
        removeWasCalled = true;

        //make sure we're removing the ORIGINAL file
        assert.equal(path, file.revOrigPath);

        callback(null);
      }
    });

    stream.on('data', function() {

      //make sure we removed a file
      assert(removeWasCalled);

      done();
    });

    stream.write(file);

  });

  it('should not remove the original file when it has been rewritten and has been excluded', function(done) {
    var removeWasCalled = false;

    var file = new File({
      cwd: '/',
      base: '/test/',
      path: '/dist/index.abcd.js',
      contents: new Buffer('')
    });
    file.revOrigPath = '/dist/index.js';

    var stream = revDel({

      exclude: function() {
        return true
      },

      remove: function(path, callback) {
        removeWasCalled = true;

        //make sure we're removing the ORIGINAL file
        assert.equal(path, file.revOrigPath);

        callback(null);
      }
    });

    stream.on('data', function() {

      //make sure we removed a file
      assert(!removeWasCalled);

      done();
    });

    stream.write(file);

  });

});