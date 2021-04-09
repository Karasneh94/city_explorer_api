/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

let weatherArr = [];
let locationObj ;
let parkArr = [];

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

function Park(name, address, fee, description, url) {
    this.name = name;
    this.address = address;
    this.fee = fee;
    this.description = description;
    this.url = url;
    parkArr.push(this);
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

app.get('/parks', handleParks);

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

    const key = process.env.GEOCODE_API_KEY;
    const city = request.query.city;

    


const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;


superagent.get(url).then(res => {

    res.body.map(element => {

        locationObj = new Location(city, element.display_name, element.lat, element.lon);

    });
    response.send(locationObj);
});

}




function handleWeather(request, response) {

    weatherArr.length !== 0 ? weatherArr = [] : console.log('first weather array');

    let key = process.env.WEATHER_API_KEY;


    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationObj.latitude}&lon=${locationObj.longitude}&key=${key}&days=8`;

    superagent.get(url).then(res => {

        res.body.data.map(element => {

            new Weather(element.weather.description, element.valid_date);

        });
        response.send(weatherArr);
    });
}

function handleParks(request, response) {

    parkArr.length !== 0 ? parkArr = [] : console.log('first park array');

    const key = process.env.PARKS_API_KEY;

    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${request.query.search_query}&api_key=${key}&limit=100`;

    superagent.get(url).then(res => {

        res.body.data.map(element => {

            new Park(element.fullName, element.addresses[0].city, element.entranceFees[0].cost, element.description, element.url);

        });
        response.send(parkArr);
    }).catch(err => {console.log('Something went wrong in parks api');});

}



app.listen(PORT, () => { console.log(`App is running on Server on port ${PORT}`); });



