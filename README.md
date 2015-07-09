# Rechnungsvorlage

Freiberufler/Selbständige können mit der Vorlage eine HTML/PDF Rechnung erstellen.

* http://codepen.io/nikolaygit/pen/oXegzM

Full-page demo: http://s.codepen.io/nikolaygit/debug/oXegzM

## Use

* git clone
* ```npm i```
* ```cp data/example-invoice.json data/private/invoice.json``` and enter your own data in ```invoice.json```
* in ```scripts/main.js``` change set ```var invoiceJson = 'data/private/invoice.json';```
* ```npm run livereload```
* open ```index.html``` in Chrome
* print to PDF from Chrome and save the invoice file.

## Development

* ```npm run scss```

## Features

* web-based
* Automatic calculation of VAT and gross amount
* Print to PDF
* Data as JS objects (dev)
* Livereload of data (dev)

## Roadmap

* :white_check_mark: Move the codepen into the Git repo.
* Create online editable version.
* Add the option to create automatically the invoice number.
* Iterate according to own and friends needs.

## Learn

Sie können sich hier mehr über Rechnungen informieren: https://github.com/nikolaygit/freiberufler/blob/master/rechnungen/Rechnungen.md

# History

* 0.0.3
    * Calculate VAT and gross amount automatically from the totalAmount of the given positions.
    * Run ``bower install`` automatically after ``npm i``. 
* 0.0.2: Use Json files for the data. Add a data/private directory.
