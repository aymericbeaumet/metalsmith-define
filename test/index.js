'use strict'

const Metalsmith = require('metalsmith')
const define = require('..')
const path = require('path')
const test = require('ava')

const srcDir = path.resolve(__dirname, 'fixtures')

test.cb('metalsmith-define should add a new key to the metadata with the given value', (t) => {
  t.plan(2)
  Metalsmith(srcDir)
    .use(define({
      'key': 'value'
    }))
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata()
      t.same(metadata['key'], 'value')
      return done()
    })
    .build((error) => {
      t.ifError(error)
      t.end()
    })
})

test.cb('metalsmith-define should correctly define several keys at once', (t) => {
  t.plan(3)
  Metalsmith(srcDir)
    .use(define({
      'key1': 'value1',
      'key2': 'value2'
    }))
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata()
      t.same(metadata['key1'], 'value1')
      t.same(metadata['key2'], 'value2')
      return done()
    })
    .build((error) => {
      t.ifError(error)
      t.end()
    })
})

test.cb('metalsmith-define should override any existing key', (t) => {
  t.plan(2)
  Metalsmith(srcDir)
    .use(define({
      'key': 'value1'
    }))
    .use(define({
      'key': 'value2'
    }))
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata()
      t.same(metadata['key'], 'value2')
      return done()
    })
    .build((error) => {
      t.ifError(error)
      t.end()
    })
})

test.cb('metalsmith-define should define nothing by default', (t) => {
  t.plan(2)
  let length
  Metalsmith(srcDir)
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata()
      length = Object.keys(metadata).length
      return done()
    })
    .use(define())
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata()
      t.same(Object.keys(metadata).length, length)
      return done()
    })
    .build((error) => {
      t.ifError(error)
      t.end()
    })
})
