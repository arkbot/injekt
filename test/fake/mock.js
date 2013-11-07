/* jshint node: true, strict: true, maxdepth: 2, maxcomplexity: 5, undef: true */
/* jshint indent: 2, quotmark: single */

'use strict';

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

    for (var i in params) {
      props[i] = with_defaults(params[i]);
    }

    return Object.create(FakeMockBase, props).context;
  };

})();