<!--
## [![INJEKT - Simple Dependency Injection](https://raw.github.com/arkbot/injekt/master/resources/images/logo.png)](https://github.com/arkbot/injekt) ##
-->

## INJEKT - Simple Dependency Injection

INJEKT is a tiny dependency injection framework for [NodeJS](http://nodejs.org/).

* [Background Philosophy](https://github.com/arkbot/injekt#background-philosophy)
* [Installation](https://github.com/arkbot/injekt#installation-options)
* [Syntax + Usage](https://github.com/arkbot/injekt#syntax--usage)
* [Current Goals](https://github.com/arkbot/injekt#current-goals)
* [Future Thoughts](https://github.com/arkbot/injekt#future-thoughts)
* [Bug Reports + Other Requests](https://github.com/arkbot/injekt#bug-reports--other-requests)
* [Further Notes](https://github.com/arkbot/injekt#further-notes)

Feel free to [skip ahead](https://github.com/arkbot/injekt#installation-options) if you know what you're looking for.

## Background Philosophy ##

> **NOTE: This section is still under construction.**

To put it less concisely, INJEKT is a platform for loading your software dependencies in an injectable manner. For those of you not familiar with the principles behind _Dependency Injection_ (dependency inversion, inversion of control, context isolation, etc.), you're probably wondering what I mean by _an injectable manner_. I'll give you a hint, the following code is the complete opposite of what I mean:

```javascript
var MyPlane = Object.create({
  'init' : function () {
    var Engine = require('engine.js'), Propeller = require('propeller.js'); // bad bad bad
    this.engine = new Engine();
    this.propeller = new Propeller();    
  }
});
```

<!-- and why is this bad bad bad? -->

After scouring the web, I've noticed that the supporting language and logical rhetoric can obscure the underlying ideals behind _Dependency Injection_ and its practical implications. With that being said, perhaps we should digress briefly into some intellectual banter regarding design patterns and general programming strategy.

Part of our job, as _responsible software engineers_, is to ensure that we write maintainable code that can be readily adjusted to changes in functional requirements. While there are many methodologies available to help us meet this goal, we should be able to agree, in general, that our code is implicitly maintainable if each tier of the platform is _reliable_, _performant_, and _individually testable_.

> Still working on this, keep checking back!

## Installation Options ##

In addition to the options below, you can also download the [raw injekt.js](https://raw.github.com/arkbot/injekt/master/lib/injekt.js) or [package tarball](https://github.com/arkbot/injekt/tarball/master).

##### Install via `npm`:

    npm install injekt

##### Clone GIT repository:

    git clone git@github.com:arkbot/injekt.git

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
* Integrate browser compatability:
  * Setup individual interfaces for [RequireJS](http://www.requirejs.org) and [NodeJS](http://nodejs.org/docs/v0.4.7/api/modules.html#all_Together...).
  * Investigate usage support for [Contextify](https://npmjs.org/package/contextify).

## Bug Reports + Other Requests ##

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