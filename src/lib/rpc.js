const {BlockResponse} = require('../pb/c3_pb')
const toBuffer = require('typedarray-to-buffer')

async function request() {
	const data = {"jsonrpc":"2.0","id":"1","method":"c3_getBlock", "params":["0x1"]}
	const res = await fetch('http://localhost:5000', {
		method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
	})
	const json = await res.json()
	console.log(json)

	const buf = toBuffer(json.data.value.data)
  var blk = BlockResponse.deserializeBinary(buf)
  console.log('foo', blk.getBlockhash())
}

request()
