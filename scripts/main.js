'use strict';

// render with http://www.dustjs.com/
var src = document.getElementById('rechnungsvorlage').innerHTML;
console.log('src: ', src);
var compiled = dust.compile(src, 'rechnung');
dust.loadSource(compiled);
dust.render('rechnung', data, function(err, out) {
  document.getElementById('rechnungsvorlage').innerHTML = out;
});