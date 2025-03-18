const csvToJson = require("convert-csv-to-json")

const database = {
  teams: [],
  people: [],
  roles: [],
  softwares: [],
  equipments: [],
  supplies: [],
}

Object.keys(database).forEach((key) => {
  database[key] = [
    ...database[key],
    ...csvToJson.fieldDelimiter(",").getJsonFromCsv(`./data/${key}.csv`),
  ]
  if (database[key].length > 0) {
    const firstItem = database[key][0]
    Object.keys(firstItem).forEach((itemkey) => {
      if (
        database[key].every((item) => {
          return /^-?\d+$/.test(item[itemkey])
        })
      ) {
        database[key].forEach((item) => {
          item[itemkey] = Number(item[itemkey])
        })
      }
    })
  }
})

module.exports = database
