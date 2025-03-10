const token = 'ВАШ ТОКЕН';
const pcInput = document.getElementById('search');
const mobInput = document.getElementById('mobile-search')
const pcCity = document.getElementById('pc-city');
const pcTemp = document.getElementById('pc-temp');
const mobTemp = document.getElementById('mob-temp');
const pcWeather = document.getElementById('pc-weather');
const mobWeather = document.getElementById('mob-weather');
const pcHumidity = document.getElementById('pc-humidity');
const pcWind = document.getElementById('wind');
const mobDay = document.getElementById('mobile-day');
const mobDate = document.getElementById('mobile-date');
pcInput.addEventListener('keypress', setQuery);
mobInput.addEventListener('keypress', setQuery);
function setQuery(event) {
    if (event.keyCode === 13) {
        const city = event.target.value;
        getResult(city);
    }
};
async function getResult(city) {
    console.log(city);
    try {
        const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`);
        const data = await respone.json();
        console.log(data);
        pcCity.textContent = data.name; 
        pcTemp.textContent = `${Math.round(data.main.temp)}°C`; 
        pcWeather.textContent = data.weather[0].main;
        pcHumidity.textContent = `Humidity: ${data.main.humidity}%`; 
        pcWind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        mobTemp.textContent = `${Math.round(data.main.temp)}°C`; 
        mobWeather.textContent = data.weather[0].main; 
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        const dayOfWeek = daysOfWeek[today.getDay()];
        const month = months[today.getMonth()]; 
        const dayOfMonth = today.getDate(); 
        const year = today.getFullYear(); 
        const formattedDate = `${month} ${dayOfMonth}, ${year}`;
        mobDay.textContent = dayOfWeek; 
        mobDate.textContent = formattedDate; 
        function isDayTime() {
            const currentTime = new Date();
            const currentHour = currentTime.getHours(); 
            return currentHour >= 6 && currentHour < 20;
        }
        if (isDayTime()) {
            console.log('Сейчас день');
            document.body.style.backgroundColor = '#42C2FF'; 
        } else {
            console.log('Сейчас ночь');
            document.body.style.backgroundColor = '#712b75';
        }
        switch (data.weather[0].main.toLowerCase()) {
            case 'rain':
                document.querySelector('.background-svg').setAttribute('src', 'images/pc/Failure 1.svg');
                document.body.style.backgroundColor = isDayTime() ? '#a8aac4' : '#712b75'; 
                document.getElementById('mob-header-picture').setAttribute('src', 'images/mobile/footer/7 1.svg');
                break;
            case 'clouds':
                document.querySelector('.background-svg').setAttribute('src', 'images/mobile/footer/27 1.svg');
                document.body.style.backgroundColor = isDayTime() ? '#a8aac4' : '#712b75'; 
                document.getElementById('mob-header-picture').setAttribute('src', 'images/mobile/header/Group 7.svg');
                break;
            case 'snow':
                document.querySelector('.background-svg').setAttribute('src', 'images/pc/snow 1.svg');
                document.body.style.backgroundColor = isDayTime() ? '#6ba7cc' : '#712b75'; 
                document.getElementById('mob-header-picture').setAttribute('src', 'images/mobile/header/Group 7.png');
                break;
            default:
                document.body.style.backgroundColor = isDayTime() ? '#42C2FF' : '#712b75'; 
        }
    } catch (error) {
        console.log('Error:', error);
    }
}