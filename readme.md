# metalsmith-define [![Build Status](https://travis-ci.org/aymericbeaumet/metalsmith-define.svg?branch=master)](https://travis-ci.org/aymericbeaumet/metalsmith-define)

> A Metalsmith plugin to define values in the metadata.

## Install

```sh
npm install --save metalsmith-define
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

**metalsmith.json**

```json
{
  "plugins": {
    "metalsmith-define": {
      "production": true
    }
  }
}
```

### API

```javascript
var metalsmith = require('metalsmith')
var metalsmithDefine = require('metalsmith-define')

metalsmith(__dirname).use(
  metalsmithDefine({
    _: require('underscore'),
    development: true,
    pkg: require('./package.json'),
    helpers: require('./helpers.js'),
  })
)
```

**metalsmithDefine(options)**

#### options

Type: `Enumerable` _(Array, Class, Map, Object, string, etc)_
Default: `{}`

This parameter will be iterated on all its key/value pairs either via:

- `{type}.prototype.entries` if the type supports this method (e.g.,
  [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)),
- or
  [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
  for all the other types: Array, Object, etc

The pairs will be merged into the metadata object in the order in which they are
being iterated on.
