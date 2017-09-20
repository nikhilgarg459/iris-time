'use strict';

const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

server.listen(3002);

server.on('listening', function(){
    console.log(`IRIS-Time is listenong on ${server.address().port} in ${service.get('env')} mode`); 
});