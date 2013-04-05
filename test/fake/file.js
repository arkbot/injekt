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
    'path_for_injekt' : function () {
      return './test/fake/file.js';
    },
    'path_for_require' : function () {
      return './fake/file.js';
    }
  };

  module.exports = Object.create(FakeFileModuleBase);

})();