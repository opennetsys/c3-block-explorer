const path = require('path')
const caller = require('grpc-caller')
const express = require('express')

const {BlockResponse} = require('../src/pb/c3_pb')
const PROTO_PATH = path.resolve(__dirname, '../src/pb/c3.proto')
const client = caller('0.0.0.0:5005', PROTO_PATH, 'C3Service')

const app = express()
app.use(require('cors')())
app.use(require('body-parser')());

app.post('/', async (req, res) => {
  const data = req.body
  console.log(data)
  try {
    const ans = await client.send(data)
    res.send({data: ans.result})
  } catch(err) {
    res.json({error: err})
  }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))
