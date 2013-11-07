/* jshint node: true, strict: true, maxdepth: 2, maxcomplexity: 5, undef: true */
/* jshint indent: 2, quotmark: single */

/* jshint -W071 */

'use strict';

module.exports = function (paths) {
  return Object.create({
    topic : function (closure, context_hash, mocks_hash, cache_hash) {
      closure = closure || undefined;
      var options = { 'cache' : cache_hash, 'context' : context_hash, 'mocks' : mocks_hash };

      if (typeof closure === 'undefined') {
        require(paths.file_relative.for_pseudo.injekt)(options);
        return { };
      }

      require(paths.file_relative.for_pseudo.injekt)(options, closure);
      return closure;
    },

    inject : function (closure) {
      return function (mocks_props_hash, context_hash, embed_flag) {
        var mocks_hash = { };
        for (var i in mocks_props_hash) {
          mocks_hash[i] = require(paths.file_relative.for_pseudo.mock)(mocks_props_hash[i]);
        }
        return closure.injekt(paths.work_relative.module, {
          'mocks' : mocks_hash,
          'context' : context_hash,
          'embed' : embed_flag
        });
      };
    },

    inject_and_require : function (subject, require_key) {
      var that = this.inject(subject)();
      that.do_require(require_key);
      return that;
    }

  }, { paths: { value: paths }});
};