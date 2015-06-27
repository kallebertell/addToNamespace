
Tinytest.add('should create namespace objects', function (test) {
  addToNamespace('hello.my.friend', {
  });

  test.isNotNull(hello);
  test.isNotNull(hello.my);
  test.isNotNull(hello.my.friend);
});

Tinytest.add('should append to previous namespace objects', function (test) {
  addToNamespace('hello.my.friend', {
    'level3': 'val3'
  });

  addToNamespace('hello', {
    'level1': 'val1'
  });

  addToNamespace('hello.my', {
    'level2': 'val2'
  });

  addToNamespace('hello.my.friend', {
    'level3b': 'val3b'
  });

  test.equal(hello.my.friend.level3, 'val3');
  test.equal(hello.my.friend.level3b, 'val3b');
  test.equal(hello.my.level2, 'val2');
  test.equal(hello.level1, 'val1');
});

Tinytest.add('should make last namespace item a function', function (test) {
  addToNamespace('app.callMe', function() {
    return 'lovely day';
  });

  test.isTrue(this.toString.call(app.callMe) === '[object Function]');
  test.equal(app.callMe(), 'lovely day');
});

Tinytest.add('should be able to add primitives', function(test) {
  addToNamespace('app.constants.URL', 'http://meteorjs.com');
  addToNamespace('app.constants.NUM', 42);
  addToNamespace('app.constants.FLAG', true);

  test.equal(app.constants.URL, 'http://meteorjs.com');
  test.equal(app.constants.NUM, 42);
  test.equal(app.constants.FLAG, true);  
});

Tinytest.add('should overwrite with object', function(test) {
  function FunkyMonkey() {
    this.name = 'George';
  }

  addToNamespace('app.monkey', {
    age: 23
  });

  addToNamespace('app.monkey', new FunkyMonkey(), true);

  test.equal(app.monkey.name, 'George');
  test.isUndefined(app.monkey.age);
});
