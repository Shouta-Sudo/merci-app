export var hyphenate = function hyphenate(string) {
  return string.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();
};

export var capitalize = function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export var camelize = function camelize(string) {
  return string.toLowerCase().replace(/-([a-z])/g, function (m, l) {
    return l.toUpperCase();
  });
};

export var eventToHandler = function eventToHandler(name) {
  return '_on' + capitalize(name);
};

export var handlerToProp = function handlerToProp(name) {
  return name.slice(2).charAt(0).toLowerCase() + name.slice(2).slice(1);
};