<!--
## [![INJEKT - Simple Dependency Injection](https://raw.github.com/arkbot/injekt/master/resources/images/logo.png)](https://github.com/arkbot/injekt) ##
-->

## INJEKT - Simple Dependency Injection

> INJEKT is a tiny dependency injection framework for [NodeJS](http://nodejs.org/).

<!--
  * overview of dependency injection
  * overview of inversion of control
  * overview of context isolation
-->

## Installation ##

    npm install injekt

<!--
  * option: clone github
  * option: download raw injekt.js
-->

## Syntax + Usage ##

##### Library Instantiation: `require('injekt')(` `default_options` `[, closure]` `);`

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

##### Module Injection: `injekt(` `module_path` `[, options]` `);`

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

## Current Goals ##

* Set up milestones on [GitHub's Issue Tracker](https://github.com/aeberlin/injekt/issues)
* Create proper API + usage documentation

## Future Thoughts ##

* Use factories for `params` parsing / `properties` building
* Setup compatability with [RequireJS](http://www.requirejs.org)

## Bug Reports + Feature Requests ##

* Please submit an issue on the [GitHub Issue Tracker](https://github.com/aeberlin/injekt/issues).

* Please attach at least one of the following for bug reports:

  * diagnostic procedure
  * sample code
  * assertion tests

* Please e-mail me before sending a pull request.

## Further Notes ##

* Released under the [MIT License](http://www.opensource.org/licenses/MIT) ([attached](https://github.com/arkbot/injekt/blob/master/LICENSE.txt)).
* Project developed with a full integration test suite via [`should`](https://npmjs.org/package/should) and [`vows`](https://npmjs.org/package/vows).
* DISCLAIMER: This project is still highly experimental.