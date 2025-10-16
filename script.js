let count = 0;
const counterElement = document.getElementById('counter');
const timeElement = document.getElementById('currentTime');
const clockTimeElement = document.getElementById('clockTime');
const clockDateElement = document.getElementById('clockDate');
const clockDateISOElement = document.getElementById('clockDateISO');

// Digital clock functionality
function updateDigitalClock() {
    const now = new Date();
    
    // Format time as HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const dateString = `${dayName}, ${monthName} ${date}`;
    
    // Format ISO date as YY-MM-DD
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const isoDateString = `${year}-${month}-${day}`;
    
    if (clockTimeElement) {
        clockTimeElement.textContent = timeString;
    }
    if (clockDateElement) {
        clockDateElement.textContent = dateString;
    }
    if (clockDateISOElement) {
        clockDateISOElement.textContent = isoDateString;
    }
}

// Update clock every second
setInterval(updateDigitalClock, 1000);
updateDigitalClock(); // Initial call

function changeBackground(color) {
    document.body.style.background = `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)`;
    // Add a fun animation
    document.querySelector('.container').style.transform = 'scale(0.98)';
    setTimeout(() => {
        document.querySelector('.container').style.transform = 'scale(1)';
    }, 150);
}

function adjustColor(color, amount) {
    // Simple color adjustment for gradient
    const usePound = color[0] == '#';
    const col = usePound ? color.slice(1) : color;

    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num >> 8 & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;

    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;

    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16);
}

function incrementCounter() {
    count++;
    counterElement.textContent = count;
    counterElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterElement.style.transform = 'scale(1)';
    }, 200);
}

function updateTime() {
    const now = new Date();
    timeElement.textContent = now.toLocaleString();
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Weather functionality
async function getWeather() {
    const weatherElement = document.getElementById('weather-info');
    if (!navigator.geolocation) {
        weatherElement.textContent = 'Geolocation not supported';
        return;
    }

    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`https://wttr.in/~${lat},${lon}?format=j1`);
        const data = await response.json();

        const temp = data.current_condition[0].temp_C;
        const condition = data.current_condition[0].weatherDesc[0].value;
        const location = data.nearest_area[0].areaName[0].value;

        weatherElement.innerHTML = `${location}: ${temp}°C, ${condition}`;
    } catch (error) {
        weatherElement.textContent = 'Unable to load weather';
        console.error('Weather error:', error);
    }
}

// Add some fun on page load
window.addEventListener('load', () => {
    document.querySelector('h1').style.opacity = '0';
    document.querySelector('h1').style.animation = 'none';

    setTimeout(() => {
        document.querySelector('h1').style.transition = 'opacity 1s';
        document.querySelector('h1').style.opacity = '1';
    }, 500);

    // Load weather
    getWeather();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '5') {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
        changeBackground(colors[e.key - 1]);
    }
});
