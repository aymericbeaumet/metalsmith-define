[![NPM version](https://img.shields.io/npm/v/metalsmith-define.svg?style=flat&label=npm)](https://www.npmjs.com/package/metalsmith-define)
[![Linux build status](https://img.shields.io/travis/aymericbeaumet/metalsmith-define/master.svg?style=flat&label=linux)](https://travis-ci.org/aymericbeaumet/metalsmith-define)
[![Windows build status](https://img.shields.io/appveyor/ci/aymericbeaumet/metalsmith-define/master.svg?style=flat&label=windows)](https://ci.appveyor.com/project/aymericbeaumet/metalsmith-define)
[![Code coverage](https://img.shields.io/codeclimate/coverage/github/aymericbeaumet/metalsmith-define.svg?style=flat&label=coverage)](https://codeclimate.com/github/aymericbeaumet/metalsmith-define)
[![GPA](https://img.shields.io/codeclimate/github/aymericbeaumet/metalsmith-define.svg?style=flat&label=GPA)](https://codeclimate.com/github/aymericbeaumet/metalsmith-define)
[![Dependencies status](https://img.shields.io/david/aymericbeaumet/metalsmith-define.svg?style=flat&label=dependencies)](https://david-dm.org/aymericbeaumet/metalsmith-define)

# metalsmith-define

A Metalsmith plugin to define values in the metadata.

## Installation

```javascript
$ npm install metalsmith-define
```

## Usage

Why you would use it is up to you, but here some ideas:
- expose a node module (e.g.: Underscore.js) in the metadata to use it in a
    template
- set variable related to the build script (e.g.: development/production
    environment)
- expose JSON files (e.g.: expose the `package.json` file similarly to how
    it's done in a classic Gruntfile)
- expose your own JavaScript modules (e.g.: define custom helper functions)

### CLI

```javascript
{
  "plugins": {
    "metalsmith-define": {
      "production": true
    }
  }
}
```

### JavaScript

```javascript
var MetalSmith = require('metalsmith');
var define = require('metalsmith-define');

Metalsmith(__dirname)
  .use(define({
    '_': require('underscore'),
    development: true,
    pkg: require('./package.json'),
    helpers: require('./helpers.js')
  }))
```

The option object passed to `metalsmith-define` contains couples of key/value.
Each value will be exposed in the metadata at the corresponding key.

## Changelog

* 2.0.0
  * Add AppVeyor
  * Add EditorConfig
  * Change license
  * Switch to standard coding style
  * 100% code coverage
  * Fix dependencies with shrinkwrap
  * Bump dependencies
  * Switch test engine to tape

* 1.0.0
  * Bump stable

* 0.0.2
  * Switch to Mocha/Chai to test

* 0.0.1
  * Define key/values in the metadata

## License

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [Aymeric Beaumet](https://aymericbeaumet.com)
has waived all copyright and related or neighboring rights to this work.
