
const path = require('path')

const main = ({pc}) => {

  // normalise
  pc = pc.toUpperCase().replace(/[^A-Z0-9]/g, '')

  // extract first part of postcode
  const match = pc.match(/^([A-Z][A-Z]?[0-9][0-9]?[A-Z]?)[0-9][A-Z][A-Z]$/)
  if (match) {
    try {
      const filename = path.join(__dirname, 'data', match[1] + '.json')
      const lookup = require(filename)
      const lookupPC = lookup[pc]
      if (lookupPC) {
        return lookupPC
      } else {
        throw new Error('unknown postcode')
      }

    } catch {
      throw new Error('unknown prefix')
    }
  } else {
    throw new Error('invalid postcode')
  }
 }

 module.exports = main