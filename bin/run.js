'use strict';

const config = require('../config');
const log = config.log();
const request = require('superagent');
const service = require('../server/service')(config);
const http = require('http');

const server = http.createServer(service);

server.listen();

server.on('listening', function () {
    log.info(`IRIS-Time is listenong on ${server.address().port} in ${service.get('env')} mode`);

    const announce = () => {
        request.put(`http://127.0.0.1:3001/service/time/${server.address().port}`)
            .set('X-IRIS-SERVICE-TOKEN', config.serviceAccessToken)
            .set('X-IRIS-API-TOKEN', config.irisApiToken)
            .end((err, res) => {
                if (err) {
                    log.debug(err);
                    log.info('There was an error connecting to Iris');
                    return;
                }
                log.info(res.body);
            });
    };

    announce();

    setInterval(announce, 15 * 1000);
});