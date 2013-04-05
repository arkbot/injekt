"use strict";

(function () {

  var FakeMockBase = {
    'context' : function () {
      return this;
    }
  };

  module.exports = function (params) {
    var props = { };

    var with_defaults = function (value) {
      return {
        writable: true,
        configurable: true,
        enumerable: true,
        value: value
      };
    };

    for (i in params) {
      props[i] = with_defaults(params[i]);
    }

    return Object.create(FakeMockBase, props).context;
  };

})();