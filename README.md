
# postcodelookup

A simple library that allows a postcode to be converted into its
latitude and longitude.

This repository contains the code to:

- convert the Office for National Statistics postcode file into suitable data files.
- lookup a given postcode to provide its latitude & longitude.

No databases, just files.

## Prepare

```sh
git clone https://github.com/glynnbird/postcodelookup.git
cd postcodelookup
npm install
```

## Setup

Download the latest postcode lookup data from the [Office for National Statistics](https://geoportal.statistics.gov.uk/datasets/4f71f3e9806d4ff895996f832eb7aacf).

Unzip the download and look in the directory structure for a large CSV file e.g. `NSPL_FEB_2020_UK/Data/NSPL_FEB_2020_UK.csv` - we need this file for our setup process.

Run `setup.js` passing in the path to that CSV file to do a one-off setup process e.g:

```sh
./setup.js ~/Downloads/NSPL_FEB_2020_UK/Data/NSPL_FEB_2020_UK.csv
```

## Use

In your code:

```js
const lookup = require('.')
lookup('w1a1aa')
// { pc: 'W1A 1AA', lat: '51.518561', long: '-0.143799' }
```