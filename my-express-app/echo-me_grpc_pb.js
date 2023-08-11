// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var echo$me_pb = require('./echo-me_pb.js');

function serialize_simple_SimpleRequest(arg) {
  if (!(arg instanceof echo$me_pb.SimpleRequest)) {
    throw new Error('Expected argument of type simple.SimpleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_simple_SimpleRequest(buffer_arg) {
  return echo$me_pb.SimpleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_simple_SimpleResponse(arg) {
  if (!(arg instanceof echo$me_pb.SimpleResponse)) {
    throw new Error('Expected argument of type simple.SimpleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_simple_SimpleResponse(buffer_arg) {
  return echo$me_pb.SimpleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SimpleServiceService = exports.SimpleServiceService = {
  echo: {
    path: '/simple.SimpleService/Echo',
    requestStream: false,
    responseStream: false,
    requestType: echo$me_pb.SimpleRequest,
    responseType: echo$me_pb.SimpleResponse,
    requestSerialize: serialize_simple_SimpleRequest,
    requestDeserialize: deserialize_simple_SimpleRequest,
    responseSerialize: serialize_simple_SimpleResponse,
    responseDeserialize: deserialize_simple_SimpleResponse,
  },
};

exports.SimpleServiceClient = grpc.makeGenericClientConstructor(SimpleServiceService);
