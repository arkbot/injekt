/* jshint node: true, strict: true, maxdepth: 2, maxcomplexity: 5, undef: true */
/* jshint indent: 2, quotmark: single */

/* jshint -W061 */

'use strict';

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