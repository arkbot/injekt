/* jshint node: true, strict: true, maxdepth: 2, maxcomplexity: 5, undef: true */
/* jshint indent: 2, quotmark: single */
/* global injekt */

/* jshint -W061 */

'use strict';

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