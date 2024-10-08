
const WeatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

//message1.textContent = 'From JavaScript'

WeatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    //console.log(location)

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = "Location:" + data.location
                message2.textContent = "The weather is " + data.forecast.weather
                message2.textContent += ", temperature is " + data.forecast.temperature + " degree"
                message2.textContent += ", humidity is " + data.forecast.humidity + "%"
                message2.textContent += ", it feels like " + data.forecast.feelslike + " degree"
            }
        })
})

})