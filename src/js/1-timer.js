import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let userSelectedDate = null;
let timerId = null;


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTime() {
    const currentDate = new Date();
    const diff = userSelectedDate - currentDate;
    const diffObj = convertMs(diff);

    daysValue.textContent = addLeadingZero(diffObj.days);
    hoursValue.textContent = addLeadingZero(diffObj.hours);
    minutesValue.textContent = addLeadingZero(diffObj.minutes);
    secondsValue.textContent = addLeadingZero(diffObj.seconds);

    if (diff <= 0) {
        daysValue.textContent = addLeadingZero(0);
        hoursValue.textContent = addLeadingZero(0);
        minutesValue.textContent = addLeadingZero(0);
        secondsValue.textContent = addLeadingZero(0);
        clearInterval(timerId);
        datetimePicker.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            if (selectedDate <= new Date()) {
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future',
                    position: 'topRight'
                });
                startButton.disabled = true;
            } else {
                userSelectedDate = selectedDate;
                startButton.disabled = false;
            }
        },
    };

    flatpickr(datetimePicker, options);
    startButton.disabled = true;

    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        datetimePicker.disabled = true;
        timerId = setInterval(updateTime, 1000);
    });
});
