const request = require('postman-request')
const forecast = (lat, lon, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9af5c17ff5cd4f66c75a35611e18354a&query='+ lat +','+ lon +'&units=m'

    request({ url, json: true}, (error, {body} = {})=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find Location. Try another search.', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature+' degrees out. It feels like ' + body.current.feelslike+' degrees out.'
            )
        }
    })

}
module.exports = forecast
