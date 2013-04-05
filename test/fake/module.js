"use strict";

(function () {

  var FakeModuleBase = {
    'context' : function (that) {
      that = eval(that) || this;
      return that;
    },
    'do_require' : function (key) {
      this.required = this.required || { };
      this.required[key] = require(key);
    }
  };

  module.exports = Object.create(FakeModuleBase);

})();