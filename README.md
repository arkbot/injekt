<!--
## [![INJEKT - Simple Dependency Injection](https://raw.github.com/arkbot/injekt/master/resources/images/logo.png)](https://github.com/arkbot/injekt) ##
-->

# [INJEKT](https://github.com/arkbot/injekt)

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

While scouring the web in my previous research on the subject, I've noticed that the logical rhetoric can obscure the underlying ideals behind _Dependency Injection_ and its practical implications. With that being said, this section will briefly digress into some intellectual banter regarding design patterns and general programming strategy, and conclude with an simplified example of implementing this philosophy using INJECT.

Part of our job, as _responsible software engineers_, is to ensure that we write maintainable code that can be readily adjusted to changes in functional requirements. While there are many methodologies available to help us meet this goal, we should be able to agree, in general, that our code is implicitly maintainable if each tier of the platform is _reliable_, _performant_, and _individually testable_.

To put it less concisely, INJEKT is a platform for loading your software dependencies in an injectable manner. For those of you not familiar with the principles behind _Dependency Injection_ (dependency inversion, inversion of control, context isolation, etc.), you're probably wondering what _an injectable manner_ constitutes. Here's a hint, the following code is the complete opposite of what I mean:

```javascript
var Car = Object.create({
  'init' : function () {
    var Engine = require('engine.js'), LockingMechanism = require('locking_mechanism.js'); // bad bad bad
    this.engine = new Engine();
    this.locking_mechanism = new LockingMechanism();    
  }
});
```

### Inversion of Control Life Cycle

One interpretation of these ideals, which I'm heavily biased towards, is that software architecture should be designed in a declarative, top-down fashion, where the consumer explicitly tells the product how to satisfy its contract dependencies. Decoupled objects are bound together at run time, in a cascading manner, as determined by their parent context. One obvious implication of this pattern is that it forces consumers to be inherently testable from any angle, by enforcing distinct organizational boundaries, which additionally reinforces the maintainability of the application.

> TODO: brief overview of dependency inversion principle

Since the terminology piles up rather quickly, here's a brief outline of the big players in the life cycle.

#### Provider

The Provider, also known as the injector, is the mechanism which _injects_ dependencies into the Product module. It usually takes the form of a wrapper object, which acts like `require()` and other loading mechanisms, but provides a [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) for inserting dependencies at a higher context.

#### Consumer

The Consumer is the dependent parent context which uses the Product module. This classification is relative. For example, `Car` acts as a Consumer while using `Engine`, but from a different parent context, can also act as a Product (e.g. when used by the application driver).

#### Product

The Product is the required module that dependencies are injected into from the immediate parent context.

This classification is also relative, in a manner similiar to the way Consumer is relative to context.

#### Contracts

Contracts are the dependencies injected into the Product module, and are classified in two different ways. A _Declared Dependency_ is the contract definition of an interface, while a _Resolved Dependency_ is the implementation of that contract. For example, `Engine` is declared by the contract with `Car`, but may be resolved as `DieselEngine` or any other implementation that implements the appropriate interface.

> TODO: further overview of inversion of control + brief overview of context isolation

These are the key principles behind [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection).

### Practical Applications ####

Pursuing the theme from the previous example, here's a simplified example that implements the _most basic_ ideals of dependency injection.

```javascript
var Car = Object.create({
  'init' : function (engine, locking_mechanism) {
    this.engine = engine;
    this.locking_mechanism = locking_mechanism;   
  }
});
```

You can use a constructor or an initialization method in order to inject your `Engine` and `LockingMechanism` objects, as shown above, but this is less than ideal. Constructors are meant to be used for setting member variables, and should not be used to dictate internal class behavior, from an architectural perspective. Objects should be open for extension, but closed for modification, so dependencies must be inserted via a different mechanism.

Keeping the [Open/Close Principle](https://en.wikipedia.org/wiki/Open/closed_principle) in mind, we design a simple, contractual interface in which we maintain the assumptions that an `Engine` must be able to `start()` / `stop()` and a locking mechanism must be able to `lock()` / `unlock()` the doors. In the updated example below, `Engine` is decoupled from `Car` such that changes can be made to implementation of the `Engine` without affecting the internal behavior of the `Car`, and vice-versa. More importantly, this enables us to also bind different implementations of a dependency at run-time, as long as it satisfies the contract.

```javascript
// engine.js:

var Engine = {
  'start' : function () {
    console.log('DEBUG: Engine started!');
  },
  'stop' : function () {
    console.log('DEBUG: Engine stopped!');
  }
};
module.exports = Object.create(Engine);
```
```javascript
// automatic_locks.js:

var AutomaticLocks = {
  'lock' : function () { 
    console.log('DEBUG: Doors locked!');
  },
  'unlock' : function () { 
    console.log('DEBUG: Doors unlocked!');
  }
};
module.exports = Object.create(AutomaticLocks);
```

And here is an updated `Car` module which depends on the components above.

```javascript
// car.js:

var Car = {
  'init' : function () {
    this.engine = require('engine');
    this.locking_mechanism = require('locking_mechanism');
  },
  'start' : function () {
    this.engine.start();
    this.locking_mechanism.lock();
  },
  'stop' : function () {
    this.engine.stop();
    this.locking_mechanism.unlock();
  },
  'drive' : function () { ... }
};
module.exports = Object.create(Car);
```

Up to this point, all the `Car` components have been decoupled, but they still need to be bound together at run-time. Unless a `package.json` exists for each component (undeniably overkill), `require()` won't find what it's looking for. However, with INJEKT, which extends the functionality of `require()`, the integration is trivial.

```javascript
var injekt = require('injekt')();

var engine_implementation = require('components/engine.js');
var locking_implementation = require('components/automatic_locks.js');

var my_car = injekt('./car.js', {
  'mocks' : {
    'engine'            : engine_implementation,
    'locking_mechanism' : locking_implementation
  }
});

my_car.init();
my_car.start();
my_car.drive();
my_car.stop();
```

> TODO: conclusion

And that's all, folks.

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
* Donations: `1GJBTdLM8mV1GxiEXQ9HCrpYBjh7envMj8`
* DISCLAIMER: This project is highly experimental - updates may break backwords-compatibility.