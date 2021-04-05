/* eslint-disable no-unused-vars */
'use strict';

function Location (search_query, formatted_query, latitude, longitude) {

    this.search_query = search_query;
    this.formatted_query = formatted_query;
    this.latitude = latitude;
    this.longitude = longitude;
}






require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { request } = require('node:http');

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/location', handleLocation);

app.get('/weather', handleWeather);


function handleLocation(request, response) {

    const getLocation = require('./data/location.json');
    const city = request.query.city;
    console.log(city);
    let locationObj = new Location(city, getLocation[0].display_name, getLocation[0].lat, getLocation[0].lon);
    response.send(locationObj);
}

function handleWeather() {


}

app.listen(PORT, () => console.log(`App is running on Server on port ${PORT}`));



