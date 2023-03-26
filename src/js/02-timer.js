import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let pickedTime = null;
function onClose(selectedDates) {
  pickedTime = selectedDates[0];

  if (options.defaultDate <= pickedTime) {
    startBtn.removeAttribute('disabled');
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr('input#datetime-picker', options);

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', startCounter);

function startCounter() {
  const seconds = document.querySelector('span[data-seconds]');
  const minutes = document.querySelector('span[data-minutes]');
  const hours = document.querySelector('span[data-hours]');
  const days = document.querySelector('span[data-days]');

  let timer = null;
  timer = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = Math.floor(
      (Date.parse(pickedTime) - Date.parse(currentDate)) / 1000
    );

    days.textContent = addLeadingZero(
      Math.floor(timeDifference / (60 * 60 * 24))
    );
    hours.textContent = addLeadingZero(
      Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60))
    );
    minutes.textContent = addLeadingZero(
      Math.floor((timeDifference % (60 * 60)) / 60)
    );
    seconds.textContent = addLeadingZero(Math.floor(timeDifference % 60));

    if (timeDifference <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function addLeadingZero(num) {
  return num < 10 ? '0' + num : num.toString();
}
