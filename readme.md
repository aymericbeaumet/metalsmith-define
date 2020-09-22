# metalsmith-define

[![travis](https://img.shields.io/travis/aymericbeaumet/metalsmith-define?style=flat-square&logo=travis)](https://travis-ci.org/aymericbeaumet/metalsmith-define)
[![github](https://img.shields.io/github/issues/aymericbeaumet/metalsmith-define?style=flat-square&logo=github)](https://github.com/aymericbeaumet/metalsmith-define/issues)
[![npm](https://img.shields.io/npm/v/metalsmith-define?style=flat-square&logo=npm)](https://www.npmjs.com/package/metalsmith-define)

This plugin enables you to define custom values in the metadata. Why you
would use it for is up to you, but here are some ideas:

- expose a node module (e.g.: Lodash) in the metadata to use it in a
  template
- expose `process.env` to your templates (`NODE_ENV`, etc)
- expose JSON files (e.g.: expose the `package.json` file similarly to how
  it could be done in a Gruntfile)
- expose your own JavaScript modules (e.g.: define custom helper functions)

Note that Metalsmith now has a [`metalsmith.metadata()`](https://metalsmith.io/#-metadata-json-) method, which overlaps some areas covered by this plugin. Though metalsmith-define still proves valuable in some situations:
1. You want to define metadata but you only use the CLI version of Metalsmith (with no access to the API)
2. You use the API, but the source of your metadata is not an Object. This plugin, on the other hand, supports any iterable: Array, Class, Map, etc.

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
