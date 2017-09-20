'use strict';

const service = require('../server/service');
const http = require('http');

server.listen(3002);

server.on('listening', function(){
    console.log(`IRIS-Time is listenong on ${server.address().port} in ${service.get('env')} mode`); 
});