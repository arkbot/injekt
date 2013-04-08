"use strict";

(function () {

  var FakeFileModuleBase = {
    'context' : function (that) {
      that = eval(that) || this;
      return that;
    },
    'do_require' : function (key) {
      this.required = this.required || { };
      this.required[key] = require(key);
    },
    'do_inject' : function (key) {
      this.injected = this.injected || { };
      this.injected[key] = injekt(key);
    }
  };

  module.exports = Object.create(FakeFileModuleBase);

})();