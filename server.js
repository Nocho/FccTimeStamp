// always port 8080
const express = require('express');
const url = require('url');
const http = require('http'); // should this be https? 
const url = require('url');

const app = express();
const server = http.createServer(function(req, res){
    //req -> http.IncomingMessage
    var urlo = url.parse(req.url); // parsed http URL
    res.send(urlo);
    res.end();
    
})

server.listen(process.env.PORT || 8080); // don't hard-code the port