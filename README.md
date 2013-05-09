<!--
## [![INJEKT - Simple Dependency Injection](https://raw.github.com/arkbot/injekt/master/resources/images/logo.png)](https://github.com/arkbot/injekt) ##
-->## Syntax: Library Instantiation
Syntax: Module Injection

## INJEKT - Simple Dependency Injection

INJEKT is a tiny dependency injection framework for [NodeJS](http://nodejs.org/).

* [Background Philosophy](https://github.com/arkbot/injekt#background-philosophy)
* [Installation](https://github.com/arkbot/injekt#installation-options)
* [Library Instantiation](https://github.com/arkbot/injekt#syntax-library-instantiation)
* [Module Injection](https://github.com/arkbot/injekt#syntax-module-injection)
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

Notice my comment in the code above? If that doesn't sit well with you, don't worry. We'll come back to it.

After scouring the web, I've noticed that the supporting language and logical rhetoric can obscure the underlying ideals behind _Dependency Injection_ and its practical implications. With that being said, perhaps we should digress briefly into some intellectual banter regarding design patterns and general programming strategy.

Part of our job, as _responsible software engineers_, is to ensure that we write maintainable code that can be readily adjusted to changes in functional requirements. While there are many methodologies available to help us meet this goal, we should be able to agree, in general, that our code is implicitly maintainable if each tier of the platform is _reliable_, _performant_, and _individually testable_.

#### Inversion of Control Life Cycle ####

<!-- TODO: brief overview of dependency inversion principle -->

<!-- TODO: revisit "bad bad bad" comment -->

One interpretation of these ideals, which I am heavily biased towards, is that software architecture should be designed in a declarative, top-down fashion, where the consumer explicitly tells the product how to satisfy its contract dependencies. Since the terminology piles up rather quickly, we should briefly define some of the big players in the life cycle.

1. Provider (the injection mechanism)
2. Consumer (the parent context which we require the injected module)
3. Product (the injected module)
4. Contract Dependencies (interfaces required by the product)
   * declared dependency (e.g. Pilot)
   * resolved dependency (e.g. StudentPilot)

Decoupled objects are bound together at run time, in a cascading manner, as determined by their parent context.

<!-- TODO: further overview of inversion of control + decoupling -->

The most obvious implication of this pattern is that it forces consumers to be inherently testable from any angle, in addition to reinforcing the maintainability of the overall platform, by enforcing distinct organizational boundaries.

<!-- TODO: brief overview of context isolation -->

These are the key principles behind _Inversion of Control_.

#### Practical Applications ####

Pursuing the theme from our previous example further, and taking this knowledge into account, we can easily integrate some lightweight dependency inversion into our software design. Although this adheres to the most basic form of dependency inversion, we will want to add an additional layer of abstraction in order to maintain our sanity (as functional scope increases), among other reasons.

```javascript
var MyPlane = Object.create({
  'init' : function (engine, propeller) {
    this.engine = engine;
    this.propeller = propeller;   
  }
});
```

You could use a constructor or an initialization method in order to inject your engine and propeller objects, as shown above, but this is less than ideal. Constructors are meant to be used for setting member variables, and not significantly changing class behavior at run-time, which a structural dependency can certainly do. We want our objects to be open for extension, but closed for modification, so we must decouple our dependencies without violating any design principles.

Let's draw up some quick companions for our overly-simplified `MyPlane` object.

```javascript
// MyEngine.js:
var MyEngine = {
  'start' : function () { ... },
  'stop' : function () { ... }
};
module.exports = Object.create(MyEngine);

// MyPropeller.js:
var MyPropeller = { ... };
module.exports = Object.create(MyPropeller);
```

There we go, that's a bit better. Since we want to keep things simple, let's only focus on `MyEngine`.

In order to avoid violating the [Open/Close Principle](https://en.wikipedia.org/wiki/Open/closed_principle), we design a simple, contractual interface in which we maintain the assumption that an `Engine` must be able to start and stop. Therefore, we decouple `Engine` from `Plane` such that changes can be made to implementation of the `Engine` without affecting the internal behavior of the `Plane`, and vice-versa. More importantly, this enables us to also bind different implementations of the dependency (as long as it satisfies the contract) at run-time.

Keeping all this in mind, don't you think it'd be wonderful if we could just ask for an `Engine` object and have peace of mind in knowing that it will always use the implementation that we want it to use? Let's adjust our code from earlier as if we could:

```javascript
// MyPlane.js:
var MyPlane = {
  'init' : function () {
    this.engine = require('engine');
    this.propeller = require('propeller'); 
  },
  'fly' : function () {
    this.engine.start();
    // ...
  }
};
module.exports = Object.create(MyPlane);
```

Even though I added some supporting functionality, it's still pretty similar to our code from before, right?

#### Enter INJEKT

Remember when I said earlier that we'll want to add an additional layer of abstraction in order to maintain our sanity? You've probably already connected the dots - we needed an injection mechanism. Something to bind our components together at run-time. Using INJEKT, the integration is trivial.

```javascript
var injekt = require('injekt')();

var engine_implementation = require('/MyEngine.js');
var propeller_implementation = require('/MyPropeller.js');

var my_plane = injekt('./MyPlane.js', {
  'mocks' : {
    'engine'    : engine_implementation,
    'propeller' : propeller_implementation
  }
});

my_plane.init();
my_plane.fly();
```

<!-- TODO: conclusion -->

## Installation Options ##

In addition to the options below, you can download either the [raw export](https://raw.github.com/arkbot/injekt/master/lib/injekt.js) or [package tarball](https://github.com/arkbot/injekt/tarball/master).

##### Install via `npm`:

    npm install injekt

##### Clone GIT repository:

    git clone git@github.com:arkbot/injekt.git

## Syntax: Library Instantiation

> General Usage: `require('injekt')(` `default_options` `[, closure]` `);`

The following examples are all valid. Use them wisely.

##### Minimal Reference

```javascript
var injekt = require('injekt')();
```

* NOTE: `closure` defaults to empty `{ }` when `default_options` are excluded.

##### Reference via `require(...)`: `injekt(...)`

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

##### Reference via `closure`: `closure.injekt(...)`

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

##### Reference via `global`: `global.injekt(...)`

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

## Syntax: Module Injection

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

## Current Goals ##

* Set up milestones on [GitHub's Issue Tracker](https://github.com/aeberlin/injekt/issues)
* Create proper API + usage documentation

## Future Thoughts ##

* Use factories for `params` parsing / `properties` building
* Integrate browser compatability:
  * Setup individual interfaces for [RequireJS](http://www.requirejs.org) and [NodeJS](http://nodejs.org/docs/v0.4.7/api/modules.html#all_Together...).
  * Investigate engine support for [Contextify](https://npmjs.org/package/contextify).

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
* Donations: `1GJBTdLM8mV1GxiEXQ9HCrpYBjh7envMj8`
* DISCLAIMER: This project is highly experimental - updates may break backwords-compatibility.