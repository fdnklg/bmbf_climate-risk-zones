import * as d3format from 'd3-format'
import germanLocale from 'd3-format/locale/de-DE.json'

const formatFunction = d3format.formatLocale(germanLocale)
const defaultFormat = ','

const FormattedNumber = ({ format = defaultFormat, number }) => {
  if (number === null || typeof number === 'undefined') {
    return null
  }
  return formatFunction.format(format)(number)
}

export const formatNumber = (number, format = defaultFormat) =>
  formatFunction.format(format)(number)

export default FormattedNumber
