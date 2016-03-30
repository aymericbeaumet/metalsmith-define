'use strict'

var Metalsmith = require('metalsmith')
var define = require('..')
var path = require('path')
var test = require('tape')

var srcDir = path.resolve(__dirname, 'fixtures')

test('metalsmith-define should add a new key to the metadata with the given value', function (t) {
  t.plan(2)
  Metalsmith(srcDir)
    .use(define({
      'key': 'value'
    }))
    .use(function (files, metalsmith, done) {
      var metadata = metalsmith.metadata()
      t.deepEqual(metadata['key'], 'value')
      return done()
    })
    .build(function (error) { t.error(error) })
})

test('metalsmith-define should correctly define several keys at once', function (t) {
  t.plan(3)
  Metalsmith(srcDir)
    .use(define({
      'key1': 'value1',
      'key2': 'value2'
    }))
    .use(function (files, metalsmith, done) {
      var metadata = metalsmith.metadata()
      t.deepEqual(metadata['key1'], 'value1')
      t.deepEqual(metadata['key2'], 'value2')
      return done()
    })
    .build(function (error) { t.error(error) })
})

test('metalsmith-define should override any existing key', function (t) {
  t.plan(2)
  Metalsmith(srcDir)
    .use(define({
      'key': 'value1'
    }))
    .use(define({
      'key': 'value2'
    }))
    .use(function (files, metalsmith, done) {
      var metadata = metalsmith.metadata()
      t.deepEqual(metadata['key'], 'value2')
      return done()
    })
    .build(function (error) { t.error(error) })
})

test('metalsmith-define should define nothing by default', function (t) {
  t.plan(2)
  var length
  Metalsmith(srcDir)
    .use(function (files, metalsmith, done) {
      var metadata = metalsmith.metadata()
      length = Object.keys(metadata).length
      return done()
    })
    .use(define())
    .use(function (files, metalsmith, done) {
      var metadata = metalsmith.metadata()
      t.deepEqual(Object.keys(metadata).length, length)
      return done()
    })
    .build(function (error) { t.error(error) })
})
