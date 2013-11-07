/* jshint node: true, strict: true, maxdepth: 2, maxcomplexity: 5, undef: true */
/* jshint indent: 2, quotmark: single */

/* jshint -W101 */

'use strict';

var paths = require('./resources/paths.js');
var pseudo = require(paths.file_relative.for_test.pseudo)(paths);

var vows = require('vows'), should = require('should');
var suite = vows.describe('injekt:integration:closure');

suite.addBatch({

  'when instantiating' : {

    'with a closure' : {
      topic : function () {
        return pseudo.topic({});
      },
      'embeds into closure' : function (subject) {
        should.exist(subject.Injekt, '`closure.Injekt` was not set!');
        should.exist(subject.injekt, '`closure.injekt` was not set!');
      },
      'does not embed into global' : function (subject) {
        should.not.exist(global.Injekt, '`global.Injekt` was set!');
        should.not.exist(global.injekt, '`global.injekt` was set!');
      },
      'returned closure is not global' : function (subject) {
        should.notStrictEqual(subject, global, '`closure` is `global`!');
      }
    }

  },

  'when injecting' : {

    'without options' : {
      topic : function () {
        return pseudo.topic({});
      },
      'embeds new instance of itself into injected context' : function (subject) {
        var that = pseudo.inject(subject)();
        should.isObject(that.context('Injekt'), '`Injekt` was not embedded into context!');
        should.isFunction(that.context('injekt'), '`injekt` was not embedded into context!');
        should.isFalse(that.context('Injekt') === subject.Injekt, '`Injekt` was not a new instance!');
        should.isFalse(that.context('injekt') === subject.injekt, '`Injekt` was not a new instance!');
      },
      '`require` finds external modules' : function (subject) {
        var that = pseudo.inject_and_require(subject, 'util');
        should.exist(that.context('this.required').util, '`require("util")` did not return module!');
      },
      '`require` resolves relative to file location, and not working directory' : function (subject) {
        var that = pseudo.inject_and_require(subject, paths.file_relative.for_pseudo.file);
        should.exist(that.context('this.required')[paths.file_relative.for_pseudo.file], '`require(paths.file_relative.for_pseudo.file)` did not return module!');
      }/*,
      '`injekt` resolves relative to working directory, and not file location' : function (subject) {
        should.isTrue(false);
      }*/
    },

    'with embeds' : {
      topic : function () {
        return pseudo.topic({}, {
          'foo' : Object.create({ value: 'bar'})
        });
      },
      'has direct access to embeds inside injected context' : function (subject) {
        var that = pseudo.inject(subject)();
        should.exist(that.context('foo'), 'mock was not embedded!');
        should.isObject(that.context('foo'), 'mock was not of expected type!');
        should.exist(that.context('foo').value, 'mock was missing expected content!');
      },
      '`require` finds external modules' : function (subject) {
        var that = pseudo.inject_and_require(subject, 'util');
        should.exist(that.context('this.required').util, '`require("util")` did not return module!');
      },
      '`require` resolves relative to file location, and not working directory' : function (subject) {
        var that = pseudo.inject_and_require(subject, paths.file_relative.for_pseudo.file);
        should.exist(that.context('this.required')[paths.file_relative.for_pseudo.file], '`require("paths.file_relative.for_pseudo.file")` did not return module!');
      }
    },

    'with mocks' : {
      topic : function () {
        return pseudo.topic({}, {}, {
          'inspect' : require('util').inspect
        });
      },
      'loads mocks on require inside injected context' : function (subject) {
        var that = pseudo.inject_and_require(subject, 'inspect');
        should.exist(that.context('this.required').inspect, '`require("inspect")` did not return mock!');
      },
      '`require` finds external modules' : function (subject) {
        var that = pseudo.inject_and_require(subject, 'fs');
        should.exist(that.context('this.required').fs, '`require("fs")` did not return module!');
      },
      '`require` resolves relative to file location, and not working directory' : function (subject) {
        var that = pseudo.inject_and_require(subject, paths.file_relative.for_pseudo.file);
        should.exist(that.context('this.required')[paths.file_relative.for_pseudo.file], '`require("paths.file_relative.for_pseudo.file")` did not return module!');
      }
    }

  }

}).export(module);