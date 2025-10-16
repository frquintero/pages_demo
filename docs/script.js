'use strict';

const GRADIENT_COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
const HEADING_ANIMATION_DELAY_MS = 500;
const COUNTER_ANIMATION_DURATION_MS = 200;
const BACKGROUND_ANIMATION_DURATION_MS = 150;

const elements = {
    container: document.querySelector('.container'),
    counter: document.getElementById('counter'),
    currentTime: document.getElementById('currentTime'),
    clockTime: document.getElementById('clockTime'),
    clockDate: document.getElementById('clockDate'),
    clockDateISO: document.getElementById('clockDateISO'),
    weather: document.getElementById('weather-info'),
};

const state = {
    count: 0,
    intervals: {
        currentTime: null,
        digitalClock: null,
    },
    listeners: {
        keyboardShortcutsBound: false,
    },
};

function clampColorComponent(value) {
    return Math.max(0, Math.min(255, value));
}

function adjustColor(color, amount) {
    if (typeof color !== 'string') {
        return '#000000';
    }

    const normalized = color.replace('#', '');
    if (normalized.length !== 6) {
        return color;
    }

    const numeric = parseInt(normalized, 16);
    if (Number.isNaN(numeric)) {
        return color;
    }

    const red = clampColorComponent((numeric >> 16) + amount);
    const green = clampColorComponent(((numeric >> 8) & 0x00ff) + amount);
    const blue = clampColorComponent((numeric & 0x0000ff) + amount);

    const hex = `${red.toString(16).padStart(2, '0')}${green
        .toString(16)
        .padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    return `#${hex}`;
}

function changeBackground(color) {
    if (!color) {
        return;
    }

    const gradientEndColor = adjustColor(color, -20);
    document.body.style.background = `linear-gradient(135deg, ${color} 0%, ${gradientEndColor} 100%)`;

    if (elements.container) {
        elements.container.style.transform = 'scale(0.98)';
        window.setTimeout(() => {
            if (elements.container) {
                elements.container.style.transform = 'scale(1)';
            }
        }, BACKGROUND_ANIMATION_DURATION_MS);
    }
}

function incrementCounter() {
    if (!elements.counter) {
        return;
    }

    state.count += 1;
    elements.counter.textContent = state.count.toString();
    elements.counter.style.transform = 'scale(1.2)';

    window.setTimeout(() => {
        if (elements.counter) {
            elements.counter.style.transform = 'scale(1)';
        }
    }, COUNTER_ANIMATION_DURATION_MS);
}

function updateTime() {
    if (!elements.currentTime) {
        return;
    }

    const now = new Date();
    elements.currentTime.textContent = now.toLocaleString();
}

function formatLongDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

function formatIsoDate(date) {
    return date.toISOString().slice(2, 10);
}

function updateDigitalClock() {
    const now = new Date();

    if (elements.clockTime) {
        elements.clockTime.textContent = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23',
        });
    }

    if (elements.clockDate) {
        elements.clockDate.textContent = formatLongDate(now);
    }

    if (elements.clockDateISO) {
        elements.clockDateISO.textContent = formatIsoDate(now);
    }
}

function startClocks() {
    updateTime();
    updateDigitalClock();

    if (state.intervals.currentTime) {
        clearInterval(state.intervals.currentTime);
    }

    if (state.intervals.digitalClock) {
        clearInterval(state.intervals.digitalClock);
    }

    state.intervals.currentTime = window.setInterval(updateTime, 1000);
    state.intervals.digitalClock = window.setInterval(updateDigitalClock, 1000);
}

function initializeColorButtons() {
    const colorButtons = document.querySelectorAll('[data-color]');
    colorButtons.forEach((button) => {
        button.addEventListener('click', () => changeBackground(button.dataset.color));
    });
}

function initializeActionButtons() {
    const incrementButton = document.querySelector('[data-action="increment-counter"]');
    if (incrementButton) {
        incrementButton.addEventListener('click', incrementCounter);
    }

    const refreshWeatherButton = document.querySelector('[data-action="refresh-weather"]');
    if (refreshWeatherButton) {
        refreshWeatherButton.addEventListener('click', getWeather);
    }
}

function handleKeyboardShortcuts(event) {
    const { key, target } = event;

    if (target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        return;
    }

    const index = Number.parseInt(key, 10) - 1;
    if (index >= 0 && index < GRADIENT_COLORS.length) {
        changeBackground(GRADIENT_COLORS[index]);
    }
}

async function requestCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function getWeather() {
    if (!elements.weather) {
        return;
    }

    elements.weather.textContent = 'Loading weather...';

    if (!navigator.geolocation) {
        elements.weather.textContent = 'Geolocation not supported by your browser';
        return;
    }

    try {
        const position = await requestCurrentPosition();
        const { latitude, longitude } = position.coords;
        const coordinates = encodeURIComponent(`${latitude},${longitude}`);
        const response = await fetch(`https://wttr.in/${coordinates}?format=j1`);

        if (!response.ok) {
            throw new Error(`Weather request failed with status ${response.status}`);
        }

        const data = await response.json();
        const currentConditions = data?.current_condition?.[0];
        const nearestArea = data?.nearest_area?.[0];

        if (!currentConditions || !nearestArea) {
            throw new Error('Weather data not available');
        }

        const temperature = currentConditions.temp_C;
        const condition = currentConditions.weatherDesc?.[0]?.value ?? 'Unknown conditions';
        const location = nearestArea.areaName?.[0]?.value ?? 'Your area';

        elements.weather.textContent = `${location}: ${temperature}°C, ${condition}`;
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 1) {
            elements.weather.textContent = 'Weather unavailable without location access';
            return;
        }

        console.error('Weather error:', error);
        elements.weather.textContent = 'Unable to load weather';
    }
}

function animateHeading() {
    const heading = document.querySelector('h1');
    if (!heading) {
        return;
    }

    heading.style.opacity = '0';
    heading.style.animation = 'none';

    window.setTimeout(() => {
        heading.style.transition = 'opacity 1s';
        heading.style.opacity = '1';

        window.setTimeout(() => {
            heading.style.removeProperty('transition');
            heading.style.removeProperty('animation');
        }, 1000);
    }, HEADING_ANIMATION_DELAY_MS);
}

function initialize() {
    const counterInitialValue = elements.counter?.textContent;
    const parsedCount = Number.parseInt(counterInitialValue ?? '0', 10);
    state.count = Number.isNaN(parsedCount) ? 0 : parsedCount;

    initializeColorButtons();
    initializeActionButtons();
    startClocks();

    if (!state.listeners.keyboardShortcutsBound) {
        document.addEventListener('keydown', handleKeyboardShortcuts);
        state.listeners.keyboardShortcutsBound = true;
    }
}

document.addEventListener('DOMContentLoaded', initialize);

window.addEventListener('load', () => {
    animateHeading();
    getWeather();
});
