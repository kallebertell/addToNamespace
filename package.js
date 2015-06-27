Package.describe({
  name: 'kallebertell:addtonamespace',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'adds a global addToNamespace function to client and server',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/kallebertell/addToNamespace.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('addtonamespace.js');
  api.export('addToNamespace', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('kallebertell:addtonamespace');
  api.addFiles('addtonamespace-tests.js');
});
