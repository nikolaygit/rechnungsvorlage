'use strict';

var invoiceJsonUrl = 'data/example-invoice.json';
//var invoiceJsonUrl = 'data/private/invoice.json';

// render with http://www.dustjs.com/
var src = document.getElementById('rechnungsvorlage').innerHTML;
var compiled = dust.compile(src, 'rechnung');
dust.loadSource(compiled);

loadJSON(invoiceJsonUrl, function(result) {
  var invoiceJson = JSON.parse(result);

  var isInvoiceValid = validateInvoice(invoiceJson);
  if (isInvoiceValid) {
    var positions = invoiceJson.invoice.positions;

    var positionsSum = _.reduce(positions, function(sum, position) {
      return sum.add(Big(position.totalPrice));
    }, Big(0));

    var priceNetto = positionsSum;
    var priceMwSt = mwst(positionsSum);
    var priceBrutto = positionsSum.add(priceMwSt);

    var numberOfDigits = 2;
    invoiceJson.invoice.priceNetto = parseFloat(priceNetto).toFixed(numberOfDigits);
    invoiceJson.invoice.priceMwSt = parseFloat(priceMwSt).toFixed(numberOfDigits);
    invoiceJson.invoice.priceBrutto = parseFloat(priceBrutto).toFixed(numberOfDigits);
  }

  console.log('invoiceJson = ', invoiceJson);

  dust.render('rechnung', invoiceJson, function(err, out) {
    document.getElementById('rechnungsvorlage').innerHTML = out;
  });
});

function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function () {
    if (parseInt(xobj.readyState) === 4 && parseInt(xobj.status) === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function validateInvoice(invoice) {
  var errors = [];
  if (!invoice.seller) {
    errors.push('The invoice JSON does not have a seller property');
  }
  if (!invoice.client) {
    errors.push('The invoice JSON does not have a client property');
  }
  if (!invoice.invoice) {
    errors.push('The invoice JSON does not have a invoice property');
  }

  if (errors.length > 0) {
    _.forEach(errors, function(error) {
      console.error(error);
    });
    return false;
  } else {
    return true;
  }
}

function mwst(bigNumber) {
  var percentage = 19;
  var numberOfDigits = 2;
  return bigNumber.times(percentage).div(100).round(numberOfDigits).toFixed(numberOfDigits);
}
