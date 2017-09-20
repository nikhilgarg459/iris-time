'use strict'

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

const locationApiKey = require('../const').locationApiKey;
const timeZoneApiKey = require('../const').timeZoneKey;
https://maps.googleapis.com/maps/api/timezone/json?location=20.593684,78.96288&timestamp=1505906422&key=AIzaSyB2cWYzN9gH8owFDlqE-MgGC8LvAn_mA-g


service.get('/service/:location', (req, res, next) => {
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location + '&key=' + locationApiKey, (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const location = response.body.results[0].geometry.location;
        const timestamp = +moment().format('X');
       
        request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&key=' + timeZoneApiKey, (err, resp) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            const result = resp.body;
            const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
            res.json({ result: timeString });
        })
    });
});

module.exports = service;