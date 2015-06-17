# Rechnungsvorlage

Freiberufler/Selbständige können mit der Vorlage eine HTML/PDF Rechnung erstellen.

* http://codepen.io/nikolaygit/pen/oXegzM

Full-page demo: http://s.codepen.io/nikolaygit/debug/oXegzM

## Use

* git clone
* ```npm i && bower i```
* ```cp data/example-invoice.json data/private/invoice.json``` and enter your own data in ```invoice.json```
* in ```scripts/main.js``` change set ```var invoiceJson = 'data/private/invoice.json';```
* ```npm run livereload```
* open ```index.html``` in Chrome
* print to PDF from Chrome and save the invoice file.


## Features

* Data as JS objects
* Livereload of data
* Print to PDF

## Roadmap

* Move the codepen into the Git repo.
* Iterate according to own and friends needs.

## Learn

Sie können sich hier mehr über Rechnungen informieren: https://github.com/nikolaygit/freiberufler/blob/master/rechnungen/Rechnungen.md

# History

* 0.0.2: Use Json files for the data. Add a data/private directory.
