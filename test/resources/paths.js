/* jshint node: true, strict: true, maxdepth: 2, maxcomplexity: 4, undef: true */
/* jshint indent: 2, quotmark: single */

'use strict';

module.exports = Object.create({
  'work_relative' : {
    'file'   : './test/fake/file.js',
    'mock'   : './test/fake/mock.js',
    'module' : './test/fake/module.js'
  },
  'file_relative' : {
    'for_fake' : {
      'file'   : './file.js',
      'mock'   : './mock.js',
      'module' : './module.js'
    },
    'for_pseudo' : {
      'file'   : '../test/fake/file.js',
      'injekt' : '../../lib',
      'mock'   : '../test/fake/mock.js',
      'module' : '../test/fake/module.js'
    },
    'for_test' : {
      'file'   : './fake/file.js',
      'mock'   : './fake/mock.js',
      'module' : './fake/module.js',
      'pseudo' : './pseudo/'
    }
  }
});