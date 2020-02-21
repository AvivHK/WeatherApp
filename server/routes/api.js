const express = require('express')
const router = express.Router()
const moment = require('moment')
const request = require('request')
const City = require('../models/City')
// const myKey = "84ee00dced304313b6175839191104"
const myKey = "d2bd976068cf8a16e097a41c61909fef"
const url = `https://api.openweathermap.org/data/2.5/weather`;


router.get('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    if (cityName) {
        request(`${url}?q=${cityName}&appid=${myKey}&units=metric`, function (err, result) {
            let body = JSON.parse(result.body)
            if (body.name) {
                const newCity = {
                    name: body.name,
                    temperature: Math.round(body.main.temp),
                    condition: body.weather[0].description,
                    conditionPic: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`,
                }
                res.send(newCity)
            }
        })
    }
})

router.get('/cities', function (req, res) {
    City.find({}).exec((err, cities) => {
        res.send(cities)
    })
})

router.post('/city', function (req, res) {
    let body = req.body;
    let city = new City(body)
    city.save();
    res.send(`Done, added ${city.name}`)
})


router.put('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(`${url}?q=${cityName}&appid=${myKey}&units=metric`, function (err, result) {
        let body = JSON.parse(result.body)
        City.findOneAndUpdate(
            { name: cityName },
            {
                temperature: Math.round(body.main.temp),
                condition: body.weather[0].description,
                conditionPic: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`
            }, function(err,res1){})
        let newCity = new City({
            name: body.name,
            temperature: Math.round(body.main.temp),
            condition: body.weather[0].description,
            conditionPic: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`,
        })
        res.send(newCity)
    })
})

router.delete('/city/:city', function (req, res) {
    const { city } = req.params
    City.findOneAndDelete({ name: city }).then(res.end())
})


module.exports = router