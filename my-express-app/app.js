const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello from lifecycle via helm! DEV Tools demo')
})

app.get('/__lbheartbeat__', (req, res) => {
  res.send('beating heart')
})
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})

