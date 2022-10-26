var inputValue = document.querySelector('#search')
var button = document.querySelector('#add')
var cityOutput = document.querySelector('#city')
var temperature = document.querySelector('#temp')
var humidity = document.querySelector('#humidity')
var description = document.querySelector('#weather')

apikey = "994e3fe2038c37a2edd8ad0a808ebb10"


function convertion(val) {
    return (val - 273).toFixed(2)
}

button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=' + apikey)
        .then(res => res.json())
        .then(data => {

            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var humid = data['main']['humidity']

            cityOutput.innerHTML = `Weather in <span>${nameval}</span>`
            temperature.innerHTML = `${convertion(tempature)}&deg C`
            description.innerHTML = `${descrip}`
            humidity.innerHTML = `Humidity:${humid}%`
        })
        .catch(err => alert('You entered Wrong city name'))

})


//date updation
function updateDate() {
    var now = new Date();
    var dnum = now.getDate();
    var month = now.getMonth();
    var dname = now.getDay();
    var yr = now.getFullYear();

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids = ["daynum", "month", "dayname", "year"];
    var values = [dnum, months[month], week[dname], yr];
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}
function initDate() {
    updateDate();
    window.setInterval("updateDate()", 1000);
}

function updateNew() {
    var now = new Date();
    var dnum = now.getDate();
    var month = now.getMonth();
    var yr = now.getFullYear();
    var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var ids = ["daynum2", "month2", "year2"];
    var values = [dnum, months[month], yr];
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}
function initNextDate() {
    updateNew();
    window.setInterval("updateNew()", 1);
}