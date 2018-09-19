//const API_HOST = process.env.API_HOST || 'http://127.0.0.1:5010'
const API_HOST = 'http://123.123.123.123:5010'

export async function request (data) {
  const res = await fetch(API_HOST, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return res.json()
}
