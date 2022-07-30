const request = require('postman-request')

const forecastCode = (lat, long, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=54968e98d374512342ede548f660d439&query='+lat+','+long

    request({url, json: true}, (error, {body}={}) => {

        if (error){
            callback('Unable to connect weather service!', undefined)
        }else if (body.error){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
        }
    })
}

module.exports = forecastCode