'use strict';

dust.filters.deComma = function(value) {
  value = typeof value !== 'string'? value + '' : value;

  value = value.replace('.', ',');
  return value;
};

dust.filters.deCurrency = function(value) {
  value = typeof value !== 'string'? value + '' : value;

  var pointIndex = value.indexOf('.');
  if (pointIndex > 0) {
    if (pointIndex === value.length-2) {
      value = value + '0';
    }
  } else {
    value = value + '.00';
  }

  value = value.replace('.', ',');
  return value + ' €';
};
