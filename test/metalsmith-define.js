var assert = require('assert');
var Metalsmith = require('metalsmith');
var define = require('../lib');

describe('metalsmith-define', function() {
  var engine;

  beforeEach(function() {
    engine = new Metalsmith(__dirname);
  });


  it('should add a new key to the metadata with the given value', function(done) {
    engine = engine
               .use(define({
                 'key': 'value'
               }));

    engine.use(function(files, metalsmith, done_) {
      var metadata = metalsmith.metadata();
      expect.equal(metadata['key'], 'value');
      done_();
    });

    engine.build(function() { done(); });
  });


  it('should override any existing key', function(done) {
    engine = engine
               .use(define({
                 'key': 'value1'
               }))
               .use(define({
                 'key': 'value2'
               }));

    engine.use(function(files, metalsmith, done_) {
      var metadata = metalsmith.metadata();
      expect.equal(metadata['key'], 'value2');
      done_();
    });

    engine.build(function() { done(); });
  });


  it('should correctly define several keys at once', function(done) {
    engine = engine
               .use(define({
                 'key1': 'value1',
                 'key2': 'value2'
               }));

    engine.use(function(files, metalsmith, done_) {
      var metadata = metalsmith.metadata();
      expect.equal(metadata['key1'], value['value1']);
      expect.equal(metadata['key2'], value['value2']);
      done_();
    });

    engine.build(function() { done(); });
  });


});
