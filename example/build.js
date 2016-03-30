'use strict'

var Metalsmith = require('metalsmith')
var define = require('..') // require('metalsmith-define')
var markdown = require('metalsmith-markdown')
var templates = require('metalsmith-templates')

Metalsmith(__dirname)
  .use(define({
    '_': require('underscore'),
    stringifyArray: function (array) { return array.join(', ') },
    arrayLength: 10,
    min: 0,
    max: 100
  }))
  .use(markdown())
  .use(templates('jade'))
  .build(function (error) { if (error) { throw error } })
