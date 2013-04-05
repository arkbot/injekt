## injekt (stable) ##

a tiny dependency injection framework for [NodeJS](http://nodejs.org/)

### Installation ###

    npm install injekt

### Syntax + Usage ###

###### Library Instantiation: `require('injekt')(default_options, closure);`

    require('injekt')({
      'context' : {
        'inspect' : require('util').inspect
      },
      'mocks' : { 
        'EmptyObject' : Object.create({ })
      }
    });


###### Module Injection: `injekt(module_path, options);`
    
    var my_module = injekt('./my_module.js', {
      'context' : { 
        'fs' : require('fs')
      },
      'mocks' : {
        'Foo' : Object.create({ bar: function () { return 'YIPPPEEEE!'; } })
      }
    });;


* NOTE: `module_path` resolution is still a little wonky (confirmed bug).
* more documentation under construction

### Current Goals ###

1. set up vows to test `injekt` via `npm` module
2. set up milestones on [GitHub](https://github.com/aeberlin/injekt/issues)
3. transfer repository to the `arkbot` github account
4. finish writing vows (~80% complete)
5. write documentation

### Future Thoughts ###

* standardize the `module_path` resolution with that of `require()` (via `require.resolve()`)
* allow isolated pockets of non-strict compatibility
* use factories for `params` parsing / `properties` building
* use itself to inject it's own dependencies
* setup compatability with [RequireJS](http://www.requirejs.org)

### Bug Reports + Feature Requests ###

* please submit an issue on [GitHub](https://github.com/aeberlin/injekt/issues) (e-mail me before sending a pull request)

* please attach at least one of the following for bug reports:

  * diagnostic procedure
  * sample code
  * assertion tests

### Further Notes ###

* released under the [MIT License](http://www.opensource.org/licenses/MIT)
* tested via the [`should`](https://npmjs.org/package/should) and [`vows`](https://npmjs.org/package/vows) packages
* recommended waiting until version 0.2.0 before using outside a risk-free environment.
* documentation is still sparse and under construction