const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eric W'
    })
})

app.get('/about',(req, res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Eric W'
    })
})

app.get('/help',(req, res)=> {
    res.render('help', {
        msg: 'Help!!!',
        title:'Help',
        name:'Eric W'
    })
})

app.get('/weather',(req, res)=> {

    if (!req.query.address) {
        return res.send(
            {error: 'Address must be provided'}
        )
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })    

})


app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help article not found',
        title:'Error',
        name:'Eric W'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Page not found',
        title:'Error',
        name:'Eric W'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
