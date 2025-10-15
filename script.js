let count = 0;
const counterElement = document.getElementById('counter');
const timeElement = document.getElementById('currentTime');
const clockTimeElement = document.getElementById('clockTime');
const clockDateElement = document.getElementById('clockDate');

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
    
    if (clockTimeElement) {
        clockTimeElement.textContent = timeString;
    }
    if (clockDateElement) {
        clockDateElement.textContent = dateString;
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

// Add some fun on page load
window.addEventListener('load', () => {
    document.querySelector('h1').style.opacity = '0';
    document.querySelector('h1').style.animation = 'none';

    setTimeout(() => {
        document.querySelector('h1').style.transition = 'opacity 1s';
        document.querySelector('h1').style.opacity = '1';
    }, 500);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '5') {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
        changeBackground(colors[e.key - 1]);
    }
});
