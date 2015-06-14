'use strict';

/* jshint -W098 */
var data = {
  seller: {
    companyName: 'My Company',
    personName: 'Nikolay Georgiev',
    ustid: 'DE948234367',
    address: {
      streerNr: 'Street. 15',
      place: '10969 Berlin'
    },
    contacts: {
      phone: '+49 176 12345678',
      email: 'nikolay@georgiev.io',
      web: 'georgiev.io'
    },
    bankAccount : {
      iban: '902348934788923490234902',
      bic: 'GENODEM1GLS',
      bankName: 'GLS Bank'
    }
  },
  client: {
    companyName: 'Client Company',
    personName: 'Max Musterclient',
    address: {
      streerNr: 'ClientStr. 7',
      place: '10999 Berlin'
    }
  },
  invoice : {
    invoiceNr: '1506-KL-01',
    achievementPeriod: '15.05.2015 - 31.05.2015',
    invoiceDate: '01.06.2015',
    textBefore: 'Ich bedanke mich für die gute Zusammenarbeit und stelle Ihnen vereinbarungsgemäß folgende Leistungen in Rechnung.',
    textAfter: 'Bitte überweisen Sie den Rechnungsbetrag ohne Abzüge auf das angegebene Bankkonto.',
    positions: [
      {
        id: 1,
        description: 'Bezeichnung 1 ein langer Text kommt hier',
        count: 10,
        countType: 'Std.',
        unitPrice: 60,
        totalPrice: 600
      },
      {
        id: 2,
        description: 'Bezeichnung 2',
        count: 12,
        countType: 'Std.',
        unitPrice: 60,
        totalPrice: 720
      }
    ],
    priceNetto: 3700,
    priceMwSt: 460,
    priceBrutto: 4160
  }
};
