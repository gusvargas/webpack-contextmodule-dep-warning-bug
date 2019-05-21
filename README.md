### Reproduce https://github.com/webpack/webpack/issues/9161

```
git clone git@github.com:gusvargas/webpack-contextmodule-dep-warning-bug.git
cd webpack-contextmodule-dep-warning-bug
yarn
yarn build
yarn run v1.6.0
$ webpack --mode development
Hash: 84ea86465d90efc8f434
Version: webpack 4.32.0
Time: 69ms
Built at: 2019-05-21 12:58:48
  Asset      Size  Chunks             Chunk Names
main.js  5.31 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/components sync recursive ^\.\/.*$] ./src/components sync ^\.\/.*$ 183 bytes {main} [built]
[./src/index.js] 33 bytes {main} [built]
    + 1 hidden module

WARNING in ./src/components/foo.js 1:1
Module parse failed: Unterminated regular expression (1:1)
You may need an appropriate loader to handle this file type.
> /invalid js
|
 @ ./src/components sync ^\.\/.*$ ./foo.js
 @ ./src/index.js
✨  Done in 0.94s.
```

I also included a plugin in the repo that fixes the bug.
```
yarn build-w-fix
yarn run v1.6.0
$ webpack --mode development --plugin ./FixContextModuleDepWarningsPlugin.js
Hash: 84ea86465d90efc8f434
Version: webpack 4.32.0
Time: 67ms
Built at: 2019-05-21 13:03:39
  Asset      Size  Chunks             Chunk Names
main.js  5.31 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/components sync recursive ^\.\/.*$] ./src/components sync ^\.\/.*$ 183 bytes {main} [built]
[./src/index.js] 33 bytes {main} [built]
    + 1 hidden module

ERROR in ./src/components/foo.js 1:1
Module parse failed: Unterminated regular expression (1:1)
You may need an appropriate loader to handle this file type.
> /invalid js
|
 @ ./src/components sync ^\.\/.*$ ./foo.js
 @ ./src/index.js
error Command failed with exit code 2.
```

Notice that when you build with the fix the module's build error fails the build, as expected.
