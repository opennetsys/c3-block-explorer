const path = require('path')
const caller = require('grpc-caller')
const express = require('express')

const PROTO_PATH = path.resolve(__dirname, '../src/pb/c3.proto')
// rpc host is the c3-go node rpc port
const RPC_HOST = process.env.RPC_HOST || '127.0.0.1:5005'
const client = caller(RPC_HOST, PROTO_PATH, 'C3Service')

const app = express()
app.use(require('cors')())
app.use(require('body-parser')())

app.post('/', async (req, res) => {
  const data = req.body
  try {
    const ans = await client.send(data)
		console.log(ans)
    res.send({data: ans.result})
  } catch (err) {
    res.json({error: err})
  }
})

// the port to expose for the frontend to connect
const port = process.env.PORT || 5010
app.listen(port, () => console.log(`Listening on port ${port}`))
