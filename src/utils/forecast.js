const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=959f90a37d486fec2f9bebc43e044d4f&query='+lat+','+long

    request({url, json:true} , (error, {body})=>{
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast