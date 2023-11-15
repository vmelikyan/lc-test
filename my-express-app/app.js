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
    res.send(`Hello from express app: CLIENT_HOST: ${process.env.CLIENT_HOST}`);
});

app.get('/echo', (req, res) => {
    let message = req.query.message || "You did not specify a message!";

    client.Echo({ value: message }, function(err, response) {
        if (err) {
            res.send('Error: ' + err.message);
        } else {
            res.send(`Received from gRPC server: ${response.value}`);
        }
    });
});

app.get('/__lbheartbeat__', (req, res) => {
    res.send('beating heart');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
