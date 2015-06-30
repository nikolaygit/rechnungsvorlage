'use strict';

dust.filters.deComma = function(value) {
  value = value.replace('.', ',');
  return value;
};

dust.filters.deCurrency = function(value) {
  value = value.replace('.', ',');
  return value + ' €';
};
