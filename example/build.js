var Metalsmith = require('metalsmith');
var define = require('../lib'); // require('metalsmith-define');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');

Metalsmith(__dirname)
  .use(define({
    '_': require('underscore'),
    stringifyArray: function(arr) { return arr.join(', '); },
    arrayLength: 10,
    min: 0,
    max: 100
  }))
  .use(markdown())
  .use(templates('jade'))
  .build(function(err) { if (err) { throw err } });
