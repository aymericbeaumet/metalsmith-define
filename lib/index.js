'use strict'

/**
 * A Metalsmith plugin to define values in the metadata.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
module.exports = function plugin (options) {
  return function (files, metalsmith, done) {
    Object.keys(options || {}).reduce(function (metadata, key) {
      metadata[key] = options[key]
      return metadata
    }, metalsmith.metadata())
    return done()
  }
}
