[![INJEKT - Simple Dependency Injection](https://raw.github.com/arkbot/injekt/master/resources/images/logo-small.png)](https://github.com/arkbot/injekt)

INJEKT is a tiny, integration-tested dependency injection framework for [NodeJS](http://nodejs.org/).

* [Background Philosophy](#background-philosophy)
* [Installation](#installation-options)
* [Library Instantiation](#syntax-library-instantiation)
* [Module Injection](#syntax-module-injection)
* [Current Goals](#current-goals)
* [Future Thoughts](#future-thoughts)
* [Bug Reports + Other Requests](#bug-reports--other-requests)
* [Further Notes](#further-notes)

Feel free to [skip ahead](#installation-options) if you know what you're looking for.

# Background Philosophy ##

> **NOTE: This section is still under construction.**

# Installation Options

In addition to the options below, you can download either the [raw export](https://raw.github.com/arkbot/injekt/master/lib/injekt.js) or [package tarball](https://github.com/arkbot/injekt/tarball/master).

### Install via `npm`:

    npm install injekt

### Clone GIT repository:

    git clone git@github.com:arkbot/injekt.git

# Syntax: Library Instantiation

> General Usage: `require('injekt')(` `default_options` `[, closure]` `);`

The following examples are all valid. Use them wisely.

### Minimal Reference

```javascript
var injekt = require('injekt')();
```

* NOTE: `closure` defaults to empty `{ }` when `default_options` are excluded.

### Reference via `require(...)`: `injekt(...)`

```javascript
var injekt = require('injekt')({
  'context' : {
    'inspect' : require('util').inspect
  },
  'mocks' : { 
    'assert' : require('should')
  }
}, { });
```

### Reference via `closure`: `closure.injekt(...)`

```javascript
var closure = {};

require('injekt')({
  'context' : {
    'inspect' : require('util').inspect
  },
  'mocks' : { 
    'assert' : require('should')
  }
}, closure);
```

### Reference via `global`: `global.injekt(...)`

```javascript
require('injekt')({
  'context' : {
    'inspect' : require('util').inspect
  },
  'mocks' : { 
    'assert' : require('should')
  }
});
```

* NOTE: `closure` defaults to `global` when excluded.

# Syntax: Module Injection

> General Usage: `injekt(` `module_path` `[, options]` `);`

INJEKT gives you two different methods of injecting your dependencies:

* `context`: embed directly into the `global` context of your product module.
* `mock`: available as a mock to be retrieved via `require(...)` inside your product module.

```javascript    
var my_module = injekt('./my_module.js', {
  'context' : { 
    'EventEmitter' : require('events').EventEmitter
  },
  'mocks' : {
    'Foo' : Object.create({ bar: function () { return 'YIPPPEEEE!'; } })
  }
});
```

* NOTE: `module_path` must be relative to the overall working directory.

# Current Goals

* Set up milestones on [GitHub's Issue Tracker](https://github.com/aeberlin/injekt/issues)
* Create proper API + usage documentation

# Future Thoughts

* Use factories for `params` parsing / `properties` building
* Integrate browser compatability:
  * Setup individual interfaces for [RequireJS](http://www.requirejs.org) and [NodeJS](http://nodejs.org/docs/v0.4.7/api/modules.html#all_Together...).
  * Investigate engine support for [Contextify](https://npmjs.org/package/contextify).

# Bug Reports + Other Requests

* Please submit an issue on the [GitHub Issue Tracker](https://github.com/aeberlin/injekt/issues).

* Please attach at least one of the following for bug reports:
  * diagnostic procedure
  * sample code
  * assertion tests

* Please e-mail me before sending a pull request.

# Further Notes

* Released under the [MIT License](http://www.opensource.org/licenses/MIT) ([attached](https://github.com/arkbot/injekt/blob/master/LICENSE.txt)).
* Accompanied by a full integration test suite, via [`should`](https://npmjs.org/package/should) and [`vows`](https://npmjs.org/package/vows).
* DISCLAIMER: This project is still highly experimental - updates may break backwords-compatibility.
