
/**
 * Will create the given namespace if it doesn't exist. 
 * Appends properties to the last namespace item from the given members parameter.
 * If the members parameter is not an object it'll.
 *
 * @namespace A namespace. E.g. 'app.foo.bar'. REQUIRED
 * @members An object whose members will be added to the namespace.
 *          If non-object is given it'll be the value of the last namespace object 
 *          (and will also overwrite any preceding object). REQUIRED
 * @forceOverwrite If set to true no appending to the last namespace item will happen, 
 *                 it will instead be overwritten even if the members param is an object. OPTIONAL
 */
addToNamespace = function(namespace, members, forceOverwrite) {
  if (!namespace) {
    throw 'namespace param not given. It should be a string separated with dots.';
  }

  if (!members) {
    throw 'members param not given. It has to be a object or a function.';
  }

  if (typeof forceOverwrite !== 'undefined' && typeof forceOverwrite !== 'boolean') {
    throw 'If given, forceOverwrite must be a boolean';
  }

  var currentContext = (typeof window !== 'undefined') ? window : global;
  var previousContext = currentContext;
  var names = namespace.split(".");

  // Add namespaces if they don’t already exist
  names.forEach(function(name) {
      if (name.length === 0) {
          throw "Invalid namespace: " + namespace;
      }

      if (!currentContext[name]) {
          currentContext[name] = { 
            $parent: currentContext
          };
      }

      previousContext = currentContext;
      currentContext = currentContext[name];
  });


  var shouldAppendToNamespace = (typeof members === 'object') && !forceOverwrite;

  if (shouldAppendToNamespace) {
     // Add members to namespace
    Object.keys(members).forEach(function(key) {
        currentContext[key] = members[key];
    });
    
  } else {
    // Write the value of members to the last namespace item 
    previousContext[names[names.length-1]] = members;

  }

};
