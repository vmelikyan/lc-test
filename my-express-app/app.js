const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = express();
const port = 8080;

const packageDefinition = protoLoader.loadSync(__dirname + '/echo-me.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const echo_proto = grpc.loadPackageDefinition(packageDefinition).simple;
const client = new echo_proto.SimpleService(process.env.CLIENT_HOST, grpc.credentials.createInsecure());

app.get('/', (req, res) => {
    console.log('got request on "/"')
  res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Express App</title>
  </head>
  <body>
    <h1>Hello from express app: CLIENT_HOST: ${process.env.CLIENT_HOST}</h1>
  </body>
</html>`);
});

app.get('/echo', (req, res) => {
    let message = req.query.message || "You did not specify a message!";

    client.Echo({ value: message }, function(err, response) {
        if (err) {
            res.send('Error: ' + err.message);
        } else {
  res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Express App</title>
  </head>
  <body>
    <h1>Received from gRPC server: ${response.value}</h1>
  </body>
</html>`);
        }
    });
});

app.get('/__lbheartbeat__', (req, res) => {
    res.send('beating heart');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
