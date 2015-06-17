'use strict';

var invoiceJson = 'data/example-invoice.json';

// render with http://www.dustjs.com/
var src = document.getElementById('rechnungsvorlage').innerHTML;
console.log('src: ', src);
var compiled = dust.compile(src, 'rechnung');
dust.loadSource(compiled);

loadJSON(invoiceJson, function(result) {
  dust.render('rechnung', JSON.parse(result), function(err, out) {
    document.getElementById('rechnungsvorlage').innerHTML = out;
  });
});

function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}