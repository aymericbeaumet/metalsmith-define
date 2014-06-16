var chai = require('chai');
var expect = chai.expect;

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
      expect(metadata['key']).to.equal('value');
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
      expect(metadata['key']).to.equal('value2');
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
      expect(metadata['key1']).to.equal(value['value1']);
      expect(metadata['key2']).to.equal(value['value2']);
      done_();
    });

    engine.build(function() { done(); });
  });


});
