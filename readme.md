# metalsmith-define

[![npm](https://img.shields.io/npm/v/metalsmith-define?style=flat-square)](https://www.npmjs.com/package/metalsmith-define)
[![Build](https://img.shields.io/travis/aymericbeaumet/metalsmith-define?style=flat-square)](https://travis-ci.org/aymericbeaumet/metalsmith-define)
[![Dependencies](https://img.shields.io/david/aymericbeaumet/metalsmith-define?style=flat-square)](https://david-dm.org/aymericbeaumet/metalsmith-define)
[![Issues](https://img.shields.io/github/issues/aymericbeaumet/metalsmith-define?style=flat-square)](https://github.com/aymericbeaumet/metalsmith-define/issues)

This plugin enables you to define custom values in the metadata. Why you
would use it for is up to you, but here are some ideas:

- expose a node module (e.g.: Lodash) in the metadata to use it in a
  template
- expose `process.env` to your templates (`NODE_ENV`, etc)
- expose JSON files (e.g.: expose the `package.json` file similarly to how
  it's done in a classic Gruntfile)
- expose your own JavaScript modules (e.g., define custom helper functions)

## Install

```sh
npm install metalsmith-define
```

## Usage

### CLI

_metalsmith.json_

```json
{
  "plugins": {
    "metalsmith-define": {
      "production": true
    }
  }
}
```

### Node.js

```javascript
const metalsmith = require('metalsmith')
const metalsmithDefine = require('metalsmith-define')

metalsmith(__dirname).use(
  metalsmithDefine({
    _: require('underscore'),
    development: true,
    pkg: require('./package.json'),
    helpers: require('./helpers.js'),
  })
)
```

## API

### metalsmithDefine(options)

#### options

Type: `Enumerable` _(Array, Class, Map, Object, string, etc)_
Default: `{}`

This parameter will be iterated on all its key/value pairs either via:

- `{type}.prototype.entries` if the method exists (e.g.,
  [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)),
- or
  [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
  for all the other types: Array, Object, etc

The pairs will be merged into the metadata object in the order in which they are
being iterated on.
