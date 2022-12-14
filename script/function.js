var inputValue = document.querySelector('#search')
var button = document.querySelector('#add')
var cityOutput = document.querySelector('#city')
var temperature = document.querySelector('#temp')
var humidity = document.querySelector('#humidity')
var description = document.querySelector('#weather')
var cityError = document.getElementById('city-error');
var resultError = document.getElementById('result-error');

apikey = "97ae2f100f4d78fe1d018be856d1ba6a"
//validation
function validateCity() {
    var city = document.getElementById('search').value;
    if (city.length == 0) {
        cityError.innerHTML = ' city is required!';
        cityError.style.color = 'red';
        cityError.style.display = 'block';
        setTimeout(function () { cityError.style.display = 'none'; }, 3000);
        return false;
    }
    if (!city.match(/^[A-Za-z]*[A-Za-z]*$/)) {
        cityError.innerHTML = 'Enter the valid city name';
        cityError.style.color = 'red';
        cityError.style.display = 'block';
        setTimeout(function () { cityError.style.display = 'none'; }, 3000);
        return false;
    }
    cityError.innerHTML = '';
    return true;
}
function convertion(val) {
    return (val - 273).toFixed(2)
}
inputValue.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("add").click();
    }
});
//refresh every 5 sec
setInterval(updateWeather(), 5000);

const updateWeather = async () => {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=' + apikey);
        const data = await response.json();
        cityOutput.innerHTML = `Weather  <span>${data.name ? data.name : "Not available"}<span>`
        temperature.innerHTML = `<span>${convertion(data.main.temp ? data.main.temp : "Not available")} C</span>`
        description.innerHTML = `<span>${data.weather[0].description ? data.weather[0].description : "Not available"}<span>`
        humidity.innerHTML = `Humidity: <span>${data.main.humidity ? data.main.humidity : "Not available"} %<span>`
    }
    catch (err) {
        console.log(err)
        resultError.innerHTML = 'Enter a city name'
        resultError.style.color = "red"
        resultError.style.display = 'block'
        setTimeout(function () { resultError.style.display = 'none'; }, 3000);
    }
}
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
    window.setInterval("updateNew()", 1000);
}