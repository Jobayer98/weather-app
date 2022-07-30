const weather = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.getElementById('one')
const msgTwo = document.getElementById('two')

weather.addEventListener('submit', (e) => {
    e.preventDefault()
    
    msgOne.textContent = 'Loading....'
    msgTwo.textContent = ''
    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if (data.error){
            msgOne.textContent = data.error
            
        }else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
})

