// var {GoogleSpreadsheet} = require('google-spreadsheet');
// var creds = require('./rhapsodist-blog-next-05aed605e1db.json');

// console.log('%%%%%%%%%%%%%%%%%%%%%%')
// console.log('%%%%%%%%%%%%%%%%%%%%%%')
// console.log(JSON.stringify(creds, undefined, 4))

// export default async (req, res) => {
//   var doc = new GoogleSpreadsheet('1-YlrfZSC2M6PzbAHREuhFm0cOxKuxi9q9WD6AeyUBXc');
//   console.log('@@@@@@@@@@@@@@@@')
//   console.log(doc)
//   doc.useServiceAccountAuth(creds, function (err) {
//     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
//     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
//     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
//     console.log(err)
//     // Get all of the rows from the spreadsheet.
//     res.send('!!!!!!!!!!!')

//     doc.getRows(1, function (err, rows) {
//       console.log(rows);
//     })
//   })
// }

const { google } = require('googleapis')
const keys = require('../../keys.json')

export default async (req, res) => {
  const client = new google.auth.JWT(keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets'])
  client.authorize((err, tokens) => {
    if (err) {
      console.log(err)
      return
    }
    
    console.log('Connected')
    gsRun(client)
  })
}

const gsRun = async (cl) => {
  const gsapi = google.sheets({version: 'v4', auth: cl})

  const opt = {
    spreadsheetId: '1-YlrfZSC2M6PzbAHREuhFm0cOxKuxi9q9WD6AeyUBXc',
    range: 'test1!A2:F3'
  }

  const data = await gsapi.spreadsheets.values.get(opt)
  const dataArray = data.data.values

  const newDataArray = dataArray.map((row) => {
    row.push(`${row[0]}-${row[1]}`)
    return row
  })
  console.log(newDataArray)

  const optUpdate = {
    spreadsheetId: '1-YlrfZSC2M6PzbAHREuhFm0cOxKuxi9q9WD6AeyUBXc',
    range: 'test1!G2',
    valueInputOption: 'USER_ENTERED',
    resource: { values: newDataArray }
  }

  const response = await gsapi.spreadsheets.values.update(optUpdate)

  console.log(response)
}