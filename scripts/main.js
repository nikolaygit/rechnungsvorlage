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

    // calculate id and totalPrice
    positions.forEach(function(position, index){
      position.id = index + 1;

      if (!position.unitPrice && position.unitPriceGross) {

        // use the tax rate of the position
        var taxRate = fin.taxRate;
        if (position.unitPriceVat) {
          fin.taxRate = position.unitPriceVat;
        }

        position.unitPrice = fin.net(position.unitPriceGross);

        // set back to the previous tax rate
        if (position.unitPriceVat) {
          fin.taxRate = taxRate;
        }
      }
      position.totalPrice = fin(position.count * position.unitPrice);
    });

    // calculate the total net, VAT and gross
    var priceNetto = _.reduce(positions, function(sum, position) {
      return fin(sum + position.totalPrice);
    }, 0);

    var priceMwSt = fin.vat(priceNetto);
    var priceBrutto = fin(priceNetto + priceMwSt);

    // validate the total net, VAT and gross
    var netVatGrossArr = [priceNetto, priceMwSt, priceBrutto];
    var isNetVatGrossValid = fin.validateNetVatGross(netVatGrossArr);
    if (!isNetVatGrossValid) {
      var errorMessage = 'The calculation of net, VAT, gross is not valid!';
      console.error(errorMessage, netVatGrossArr);
      throw new Error(errorMessage, netVatGrossArr);
    }

    // format the total net, VAT and gross
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