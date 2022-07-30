const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecastCode = require('./utils/forecastCode')
const geoCode = require('./utils/geoCode')


const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jobayer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jobayer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jobayer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an addess.'
        })
    }

    geoCode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error){
            return res.send({ error })
        }

        forecastCode(lat, long, (error, forData) =>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.listen(3000, () => {
    console.log('Server is running')
})