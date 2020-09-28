var through = require('through2');
var rimraf = require('rimraf');

/**
 * Return a stream for deleting the original file
 * @param   {object}          [options]
 * @param   {RegExp|function} [options.exclude]
 * @param   {function}        [options.remove]
 * @returns {function}
 */
module.exports = function(options) {

  var exclude = options && options.exclude || false;
  var remove = options && options.remove || rimraf;

  options = options || {};
  return through.obj(function(file, enc, cb) {

    //delete the original file
    var del = function() {
      if(file.revOrigPath) {
        rimraf(file.revOrigPath, function(err) {
          if (err) return cb(err);
          cb(null, file);
        });
      } else {
        cb(null);
      }
    };

    //don't delete files that haven't been rewritten
    if (file.revOrigPath === file.path) {
      return cb(null, file);
    }

    //exclude files from being deleted
    if (exclude) {

      var
        excluded,
        filter = exclude
      ;

      if (typeof filter === 'function') {
        excluded = filter(file);
      } else if(filter instanceof RegExp) {
        excluded = filter.test(file.path);
      }

      if (excluded) {
        return cb(null, file);
      } else {

        //delete the original file
        return del();

      }

    } else {

      //delete the original file
      return del();

    }

  });
};
