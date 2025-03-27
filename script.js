const dateInput = document.querySelector('.date-input');
const searchBtn = document.querySelector('.search-btn');
const daysEl = document.querySelector('.days');
const hoursEl = document.querySelector('.hours');
const minutesEl = document.querySelector('.min');
const secondsEl = document.querySelector('.sec');
const dateDisplay = document.querySelector('.date');
const ddEl = document.querySelector('.dd');

let targetDate = null;
let countdownActive = false;

const padNumber = (num) => num.toString().padStart(2, '0');

const updateDisplay = (days, hours, minutes, seconds) => {
    const updateIfChanged = (el, newValue) => {
        if (el.textContent !== newValue) {
            el.style.animation = 'numberPop 0.3s ease';
            el.textContent = newValue;
            setTimeout(() => el.style.animation = '', 300);
        }
    };

    updateIfChanged(daysEl, padNumber(days));
    updateIfChanged(hoursEl, padNumber(hours));
    updateIfChanged(minutesEl, padNumber(minutes));
    updateIfChanged(secondsEl, padNumber(seconds));
};

const startCountdown = (endDate) => {
    if (countdownActive) return;
    countdownActive = true;

    const update = () => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(interval);
            ddEl.textContent = "Time's Up!";
            dateDisplay.textContent = "The countdown has expired";
            countdownActive = false;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateDisplay(days, hours, minutes, seconds);
    };

    update();
    const interval = setInterval(update, 1000);
};

searchBtn.addEventListener('click', () => {
    const dateValue = dateInput.value;
    
    if (!dateValue) {
        dateInput.classList.add('error-shake');
        setTimeout(() => dateInput.classList.remove('error-shake'), 500);
        return;
    }

    // Set target date to end of selected day (23:59:59)
    targetDate = new Date(dateValue);
    targetDate.setHours(23, 59, 59, 999);

    const now = new Date();
    if (targetDate <= now) {
        alert('Please select a future date');
        return;
    }

    ddEl.textContent = 'Date Countdown';
    dateDisplay.textContent = targetDate.toDateString();
    startCountdown(targetDate);
});

dateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});
