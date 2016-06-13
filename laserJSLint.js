'use strict';

// this script iterates through a directory and
// executes fixjsstyle and gjslint on each file

var glob = require('glob');
var colors = require('colors');

require('shelljs/global');

var dir = process.argv[2];

if (dir.charAt(dir.length - 1) !== '/') {
  dir += '/';
}

if (!dir) {
  console.log(colors.red('pass a directory. example: node laserJSLint.js path/to/your/dir '));
  return;
}

console.log(colors.cyan('\n\nlinting ' + dir));


glob(dir + '**/*.js', {
  ignore: [
    '**/*.min.js',
    '**/*.bundle.js',
    '**/bundle.js',
    '**/js/vendor/**/*',
    '**/js/ThirdParty/**/*'],
}, function(er, files) {


  files.forEach(function(file) {

    var fileName = file.split('/').pop();

    console.log(colors.yellow('\n' + file));

    exec('fixjsstyle --strict ' + file + ' && gjslint --strict ' + file);

    // exec('jslint ' + file);

    console.log(colors.green(fileName + ' done\n'));

  });

});
