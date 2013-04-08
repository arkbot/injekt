"use strict";

(function () {

  var Contextify = require('contextify'), fs = require('fs'), path = require('path');

  var clean_undefined = function (o) {
    for (var i in o)
      if (typeof o[i] === 'undefined')
        delete o[i];
    return o;
  };

  var InjektBase = {
    'new' : function (params, closure) {
      var that = this || InjektBase;
      closure = closure || global;

      /* TODO: create new isolated object and embed into closure */
      closure.Injekt = Object.create(that, that.build_properties(params));
      closure.injekt = closure.Injekt.inject.bind(closure.Injekt);

      return closure.injekt;
    },

    'build_properties' : function (params) {
      params = clean_undefined(params || { });
      var props = {
        config : {
          writable: true,
          configurable: false,
          enumerable: false,
          value: {
            'cache' : params.cache || { },
            'context' : params.context || { },
            'mocks' : params.mocks || { }
          }
        }
      }
      return props;
    },

    'inject' : function (key, options) {
      options = this.normalize_options(options);
      return this.require_key(key, options);
    },

    'normalize_options' : function (options) {
      options = options || { };
      clean_undefined(options);
      options.mocks = this.normalize_items(options.mocks);
      /* TODO (?): Return default_context here after path resolution fix */
      // options.context = this.default_context(options.context);
      return options;
    },

    'normalize_items' : function (items) {
      var normalized_items = { };
      for (var i in items) {
        /* REVIEW: will this exhibit the desired behavior? */
        // if (typeof items[i] === 'string') {
        //   normalized_items[i] = this.require_key(items[i]);
        //   continue;
        // }
        
        /* REVIEW: can we contextify raw mock code? */
        normalized_items[i] = items[i];
      }
      return normalized_items;
    },

    'resolve_path' : function () {
      if (!this.module_path) {
        this.module_path = require.resolve('./');
      }
      if (arguments.length > 0) {
        /* TODO: merge with computed base_path */
        // return require((key.indexOf('.') === 0) ? path.join(path.dirname(original_path), key) : key)
        return arguments[0];
      }
    },

    'require_key' : function (key, options) {
      var code = options.mocks[key] || this.config.mocks[key];

      if (typeof code === 'undefined') {
        try {
          code = this.read_file(key);
        } catch (ex) {
          key = this.resolve_path(key);
          code = this.read_file(key);
        }
        options.base_path = key;
      }

      var context = this.extend_context(options);
      return this.contextify_module(code, context);
    },

    'read_file' : function (filepath) {
      if (!this.config.cache[filepath]) { 
        this.config.cache[filepath] = fs.readFileSync(filepath, 'utf8');
      }
      return this.config.cache[filepath];
    },

    'contextify_module' : function (code, context) {
      Contextify(context);
      context.run(code);
      context.dispose();
      return context.module.exports;
    },

    'native_require_hook' : function (original_path, key) {
      /* TODO (?): contextify_module("require('" + key + "')"); */
      if (this.config.mocks[key]) return this.config.mocks[key];
      // throw("\n" + original_path + "\n" + key + "\n");
      try {
        return require(key);
      } catch (ex) {
        throw("ERROR: Module path resolution failed");
      }
    },

    'default_context' : function (options) {
      options = options || { };
      var context = options.context || { };
      context.module = context.module || { };
      context.module.exports = context.module.exports || { };
      /* TODO: override native_require_hook to hit injekt when path problems are resolved */
      context.require = this.native_require_hook.bind(this, options.base_path);
      return context;
    },

    'extend_context' : function (options) {
      var context = options.context || this.default_context(options);
      options.embed = options.embed || true;
      if (options.embed) {
        /* REVIEW: will this exhibit the desired behavior? */
        this.new(undefined, context);
        for (var i in this.config.context) context[i] = this.config.context[i];
      }
      return context;
    }
  }

  module.exports = InjektBase.new;

})();