const ContextModule = require('webpack/lib/ContextModule');

module.exports = class FixContextModuleDepWarningsPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('FixContextModuleDepWarningsPlugin', compilation => {
      compilation.hooks.succeedModule.tap('FixContextModuleDepWarningsPlugin', mod => {
        if (mod instanceof ContextModule) {
          mod.dependencies.forEach(dep => {
            dep.optional = false;
          });
        }
      });
    });
  }
}
