'use strict'

const express = require('express');
const service = express();
const request = require('superagent');

const apiKey = require('../const.js').mapKey;

service.get('/service:location', (req, res, next) =>{
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ req.params.location +'&key=' + apiKey, (err, response) =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(response.body.results[0].geometry.location);
        
    });
});

module.exports = service;