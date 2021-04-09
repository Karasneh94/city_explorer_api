/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

let weatherArr = [];

function Location(search_query, formatted_query, latitude, longitude) {

    this.search_query = search_query;
    this.formatted_query = formatted_query;
    this.latitude = latitude;
    this.longitude = longitude;
}

function Weather(forecast, time) {
    this.forecast = forecast;
    this.time = time;
    weatherArr.push(this);
}




require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');


const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/location', handleLocation);

app.get('/weather', handleWeather);

function handleError(status, response) {

    switch (status) {
        case 500:
            response.status(500).send('Sorry, something went wrong');
            break;
        default:
            break;
    }

}

function handleLocation(request, response) {

    const getLocation = require('./data/location.json');
    const city = request.query.city;
    if (!city) {
        handleError(500, response);
    } else {
        let locationObj = new Location(city, getLocation[0].display_name, getLocation[0].lat, getLocation[0].lon);
        response.send(locationObj);
    }

}




function handleWeather(request, response) {

    // weatherArr.length !== 0 ? weatherArr = [] : console.log('first weather array');

    // const getWeather = require('./data/weather.json');
    // getWeather.data.forEach(element => {

    //     new Weather(element.weather.description, element.valid_date);

    // });

    // response.send(weatherArr);


    weatherArr.length !== 0 ? weatherArr = [] : console.log('first weather array');

    let key = process.env.WEATHER_API_KEY;
    const city = request.query.city;
    //const city = 'amman';

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}&days=8`;

    superagent.get(url).then(res => {

        res.body.data.map(element => {

            new Weather(element.weather.description, element.valid_date);

        });

    });


    response.send(weatherArr);



}

app.listen(PORT, () => { console.log(`App is running on Server on port ${PORT}`); });



