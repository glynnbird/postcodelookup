#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const LineByLineReader = require('line-by-line')
const argv = process.argv
if (!argv[2]) {
  console.error('Usage: setup.js <path to file.csv>')
  process.exit(1)
}
const filename = argv[2]

// trim quotes from a string
const trimQuote = (str) => str.replace(/^"/,'').replace(/"$/,'')

// write file to disk
const writeFile = (oc, lookup) => {
  // write 
  fs.writeFileSync(path.join('data', oc + '.json'), JSON.stringify(lookup))
}

// load the file a line at a time
const lr = new LineByLineReader(filename)
let i = 0
let pcd, lat, long
let lookup = {}
let lastOC = ''
lr.on('line', (line) => {
  line = line.split(',')
  //console.log(line) 
  if (i === 0) {
    pcd = line.indexOf('pcds')
    lat = line.indexOf('lat')
    long = line.indexOf('long')
  } else {
    if (line.length > 40) {

      const obj = {
        pc: trimQuote(line[pcd]),
        lat: trimQuote(line[lat]),
        long: trimQuote(line[long])
      }

      const oc = obj.pc.split(' ')[0]
      const pc = obj.pc.replace(' ','')
      //console.log(obj.pc, oc, lastOC)
      if (oc !== lastOC) {
        // if we have found a new outward code, write previous
        // lookup data and start a new lookup object
        if (Object.keys(lookup).length > 0) {
          process.stdout.write('  ' + lastOC + '    \r')
          writeFile(lastOC, lookup)
        }
        lookup = {}
      }
      lookup[pc] = obj
      lastOC = oc
    }
  }
  i++
})
lr.on('end', () => {
  writeFile(lastOC, lookup)
  console.log('done')
})