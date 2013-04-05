"use strict";

// var inspect = require('util').inspect;
var fake = require('./fake/fake.js'), vows = require('vows'), should = require('should');
var suite = vows.describe('injekt:integration:global');

suite.addBatch({

  'when instantiating' : {

    'without a closure' : {
      topic : function () {
        return fake.psuedotopic();
      },
      'embeds into global' : function (subject) {
        should.exist(global.Injekt, '`global.Injekt` was not set!');
        should.exist(global.injekt, '`global.injekt` was not set!');
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
        should.isFalse(that.context('Injekt') === global.Injekt, '`Injekt` was not a new instance!');
        should.isFalse(that.context('injekt') === global.injekt, '`injekt` was not a new instance!');
      }
    }

  }

}).export(module);