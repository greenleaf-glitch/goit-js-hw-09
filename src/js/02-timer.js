import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    let resultDate = selectedDate - initDate;

    if (resultDate > 0) {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () => {
        clearInterval(intervalID);
        intervalID = setInterval(() => {
          currentDateObj = convertMs(resultDate);
          renderTimer(currentDateObj);
          resultDate -= 1000;
          refs.startBtn.disabled = true;
          if (resultDate < 0) {
            clearInterval(intervalID);
          }
        }, 1000);
      });
    } else {
      refs.startBtn.disabled = true;
      Notify.warning('Please choose a date in the future');
      return;
    }
  },
};

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateTimePicker: document.querySelector('#datetime-picker'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
  bodyEl: document.body,
  backLink: document.querySelector('a'),
};

const dateInput = flatpickr(refs.dateTimePicker, options);
const initDate = dateInput.selectedDates[0];
let currentDateObj = {};
let intervalID;

const BODY_BG_COLOR_GRAY = '#546570';
const BODY_TEXT_COLOR_WHITE = '#ffffff';

refs.startBtn.disabled = true;
refs.bodyEl.style.backgroundColor = BODY_BG_COLOR_GRAY;
refs.bodyEl.style.color = BODY_TEXT_COLOR_WHITE;
refs.backLink.style.color = BODY_TEXT_COLOR_WHITE;

function renderTimer({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  let strValue = value.toString();
  return strValue.length === 1 ? strValue.padStart(2, '0') : strValue;
}

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
