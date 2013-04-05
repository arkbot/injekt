"use strict";

// var injekt_require_path = '../../lib/injekt.js';
var injekt_require_path = '../../lib';
// var injekt_require_path = 'injekt';

module.exports = Object.create({
  psuedotopic : function (closure, context_hash, mocks_hash, cache_hash) {
    closure = closure || undefined;
    var options = { 'cache' : cache_hash, 'context' : context_hash, 'mocks' : mocks_hash };

    if (typeof closure === 'undefined') {
      require(injekt_require_path)(options);
      return { };
    }

    require(injekt_require_path)(options, closure);
    return closure;
  },

  psuedoinjekt : function (closure) {
    return function (mocks_props_hash, context_hash, embed_flag) {
      var mocks_hash = { };
      for (var i in mocks_props_hash) {
        mocks_hash[i] = require('./fake/mock.js')(mocks_props_hash[i]);
      }
      return closure.injekt('./test/fake/module.js', {
        'mocks' : mocks_hash,
        'context' : context_hash,
        'embed' : embed_flag
      });
    };
  },

  injekt_and_require : function (subject, require_key) {
    var that = this.psuedoinjekt(subject)();
    that.do_require(require_key);
    return that;
  }

});