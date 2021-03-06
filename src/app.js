const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
//Define paths for Express config
const pubdirpath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

//Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pubdirpath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Omkar Chauhan'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Omkar Chauhan'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Omkar Chauhan',
        msg: 'Some helpful text here'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error) {
            return res.send({error})
        }
        
        forecast( latitude, longitude, (error, foredata) => {
            if(error){
                res.send({Error: error})
            }
            res.send({
                Location: location,
                Forecast: foredata,
                Address: req.query.address
            })
        })
    })
})
app.get('/products',(req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404: Error',
        mesg: 'Help article not found',
        name: 'Omkar Chauhan'
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title: '404: Error',
        mesg: 'Page not found!',
        name: 'Omkar Chauhan'
    })
})
// app.com
app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})
