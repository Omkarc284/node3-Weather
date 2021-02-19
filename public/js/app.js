console.log('Client side javascript isloaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    msg1.textContent = 'Loading....'
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            msg1.textContent = data.error
        }else{
            msg1.textContent = data.Location
            msg2.textContent = data.Forecast

        }
    })
})
})