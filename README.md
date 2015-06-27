# addToNamespace.js

A namespacing utility function for MeteorJS.

## Usage:
```javascript
// append the properties to the 'app.config' namespace
addToNamespace('app.config', {
  token: 'AeZ21'
});

// append the properties to the 'app.lib.tools' namespace
addToNamespace('app.lib.tools', {
  sum: function(x,y) {
    return x + x;
  }	
});

// append the properties to the 'app.lib.thing' namespace
addToNamespace('app.lib.thing', {
  giveAnswer: function(x,y) {
    return 'The answer is ' + this.$parent.tools.sum(x, y);
  }
});

// append the properties to the 'app.config' namespace
addToNamespace('app.config', {
  environment: 'STAGING'
});

// write 'app.mammals.Monkey' to the value of our constructor function
addToNamespace('app.mammals.Monkey', function Monkey(name) {
  this.name = name;
});

// write 'app.mammals.george' to the value of our object instance.
var forceOverwrite = true;
addToNamespace('app.mammals.george', new app.lib.Monkey('george'), forceOverwrite);


var token = app.config.token;
var sum = app.lib.tools.sum(1, 2);
var theAnswer = app.lib.thing.giveAnswer(1,2);
var george = app.mammals.george;
var sammy = new app.mammals.Monkey('sammy');
var environment = app.config.environment;
```

## Install

meteor add kallebertell:addtonamespace


## Why

Makes it easier to use namespaces and not have to think about js file load order in regards to namespacing. 

E.g. someone might use namespacing following directory structure:

app/client/utils/calculateArea.js
```javascript
addToNamespace('app.client.utils.calculateArea', function() { 
  // ...
});
```

app/client/utils/calculateSpeed.js
```javascript
addToNamespace('app.client.utils.calculateSpeed', function() { 
  // ...
});
```

app/client/engine.js
```javascript
var speed, area;

function init() {
  var utils = this.$parent.utils;
  speed = utils.calculateSpeed();
  area = utils.calculateArea();
}

addToNamespace('app.client.engine', {
  init: init,
  start: function() {
    // ...
  }
});
```

app/main.js
```javascript
// import
var client = app.client,
    utils = client.utils,
    engine = client.engine;

engine.init();
engine.start();
// ....
```

MeteorJS load order of those files:
```
app/client/utils/calculateArea.js
app/client/utils/calculateSpeed.js
app/client/engine.js
app/main.js
```

Note that Meteor will automatically wrap all js files in its own scope using an IIFE.
