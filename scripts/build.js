const fs = require('fs');
const browserify = require('browserify');
const watchify = require('watchify');
const errorify = require('errorify');


// build ディレクトリがなければ、作成しておく
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

let debugging = false;
// 引数で debug が指定されている場合、デバッグモードになる
if (process.argv.indexOf('--debug') >= 0) {
  debugging = true;
}


const b = browserify({
  entries: ['src/app.js'],
  cache: {},
  packageCache: {},
  debug: debugging,
  plugin: ['css-modulesify'],
}).transform('babelify', {
  presets: ['es2015', 'react'],
});
b.on('css stream', css => css.pipe(fs.createWriteStream('build/bundle.css')));

function bundle() {
  b.bundle().pipe(fs.createWriteStream('build/bundle.js'));
}

// 引数で watch が指定されている場合、監視モードになる
if (process.argv.indexOf('--watch') >= 0) {
  b.plugin(watchify);
  b.plugin(errorify);
  b.on('update', bundle);
}

bundle();
