const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = express();
const port = 8080;

const packageDefinition = protoLoader.loadSync(__dirname + '/echoing-me.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const echo_proto = grpc.loadPackageDefinition(packageDefinition).simple;
const client = new echo_proto.SimpleService(process.env.CLIENT_HOST, grpc.credentials.createInsecure());

app.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express App</title>
    <style>
        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Hello from express app</h1>
    <p>CLIENT_HOST: ${process.env.CLIENT_HOST}</p>
    <button id="clickButton">Click me!</button>
    <p id="response"></p>
    
    <script>
        document.getElementById('clickButton').addEventListener('click', async () => {
            try {
                const response = await fetch('/button-click', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                document.getElementById('response').textContent = 'Server response: ' + data.message;
            } catch (error) {
                document.getElementById('response').textContent = 'Error: ' + error.message;
            }
        });
    </script>
</body>
</html>`;
  res.send(html);
});

app.get('/echo', (req, res) => {
  let message = req.query.message || "You did not specify a message!";

  client.Echo({ value: message }, function (err, response) {
    if (err) {
      res.send('Error: ' + err.message);
    } else {
      res.send(`Received from gRPC server: ${response.value}`);
    }
  });
});

app.post('/button-click', express.json(), (req, res) => {
  const wittyMessages = [
    "Ouch! That tickles!",
    "Stop pressing me, I'm shy!",
    "This button does absolutely nothing... or does it?",
    "You found the secret button! Just kidding.",
    "I'm just a button, not a stress ball!",
    "Click me again, I dare you!",
    "Was that really necessary?",
    "Button pressed. World not ended. Yet.",
    "Congratulations! You've won... nothing!",
    "Please press gently, I bruise easily.",
    "I'm running out of witty responses here...",
    "404: Humor not found",
    "You must be really bored, huh?",
    "Achievement unlocked: Button Presser",
    "Are we there yet?",
    "This button is judging your clicking technique.",
    "Boop! You've been booped back!",
    "Warning: Excessive clicking may cause addiction"
  ];

  const randomMessage = wittyMessages[Math.floor(Math.random() * wittyMessages.length)];
  const timestamp = new Date().toISOString();

  console.log(`Button was clicked! Timestamp: ${timestamp} - Message: ${randomMessage}`);
  res.json({ message: randomMessage });
});

app.get('/__lbheartbeat__', (req, res) => {
  res.send('beating heart');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
