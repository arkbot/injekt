"use strict";

// var inspect = require('util').inspect;
var fake = require('./fake/fake.js'), vows = require('vows'), should = require('should');
var suite = vows.describe('injekt:integration:closure');

suite.addBatch({

  'when instantiating' : {

    'with a closure' : {
      topic : function () {
        return fake.psuedotopic({});
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
        return fake.psuedotopic({});
      },
      'embeds new instance of itself into injected context' : function (subject) {
        var that = fake.psuedoinjekt(subject)();
        should.isObject(that.context('Injekt'), '`Injekt` was not embedded into context!');
        should.isFunction(that.context('injekt'), '`injekt` was not embedded into context!');
        should.isFalse(that.context('Injekt') === subject.Injekt, '`Injekt` was not a new instance!');
        should.isFalse(that.context('injekt') === subject.injekt, '`Injekt` was not a new instance!');
      },
      '`require` finds external modules' : function (subject) {
        var that = fake.injekt_and_require(subject, 'util');
        should.exist(that.context('this.required').util, "`require('util')` did not return module!");
      },
      '`require` finds external files' : function (subject) {
        var that = fake.injekt_and_require(subject, '../test/fake/file.js');
        should.exist(that.context('this.required')['../test/fake/file.js'], "`require(''../test/fake/file.js'')` did not return module!");
      }
    },

    'with embeds' : {
      topic : function () {
        return fake.psuedotopic({}, {
          'foo' : Object.create({ value: 'bar'})
        });
      },
      'has direct access to embeds inside injected context' : function (subject) {
        var that = fake.psuedoinjekt(subject)();
        should.exist(that.context('foo'), 'mock was not embedded!');
        should.isObject(that.context('foo'), 'mock was not of expected type!');
        should.exist(that.context('foo').value, 'mock was missing expected content!');
      },
      '`require` finds external modules' : function (subject) {
        var that = fake.injekt_and_require(subject, 'util');
        should.exist(that.context('this.required').util, "`require('util')` did not return module!");
      },
      '`require` finds external files' : function (subject) {
        var that = fake.injekt_and_require(subject, '../test/fake/file.js');
        should.exist(that.context('this.required')['../test/fake/file.js'], "`require(''../test/fake/file.js'')` did not return module!");
      }
    },

    'with mocks' : {
      topic : function () {
        return fake.psuedotopic({}, {}, {
          'inspect' : require('util').inspect
        });
      },
      'loads mocks on require inside injected context' : function (subject) {
        var that = fake.injekt_and_require(subject, 'inspect');
        should.exist(that.context('this.required').inspect, "`require('inspect')` did not return mock!");
      },
      '`require` finds external modules' : function (subject) {
        var that = fake.injekt_and_require(subject, 'fs');
        should.exist(that.context('this.required').fs, "`require('fs')` did not return module!");
      },
      '`require` finds external files' : function (subject) {
        var that = fake.injekt_and_require(subject, '../test/fake/file.js');
        should.exist(that.context('this.required')['../test/fake/file.js'], "`require(''../test/fake/file.js'')` did not return module!");
      }
    }

  }

}).export(module);