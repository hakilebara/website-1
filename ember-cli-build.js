/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const removeFile = require('broccoli-file-remover');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'asset-cache': {
      include: [
        'assets/**/*',
        'images/**/*'
      ]
    },
    'esw-cache-fallback': {
      patterns: [ '/' ],
      version: '4' // Changing the version will bust the cache
    },
    vendorFiles: {
      'jquery.js': null
    },
    'ember-cli-staticboot': {
      paths: [
        '/'
      ],
      destDir: '/static'
    },
    addons: {
      blacklist: [
        'ember-cli-fastboot',
        'ember-cli-staticboot',
        //'ember-service-worker',
        //'ember-service-worker-asset-cache',
        //'ember-service-worker-cache-fallback'
      ]
    },
    fingerprint: {
      replaceExtensions: ['html', 'css', 'js', 'headers']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  let tree = app.toTree();

  let headersFile = new Funnel(tree, {
    files: ['netlify.headers'],
    getDestinationPath: () => '_headers'
  });

  tree = removeFile(tree, { srcFile: 'netlify.headers' });

  return new MergeTrees([tree, headersFile]);
};
