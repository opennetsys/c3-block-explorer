export async function request (data) {
  const res = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return res.json()
}
