import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const currentDate = new Date();
let timeDifference = 0;
function onClose(selectedDates) {
  timeDifference = Math.floor(
    (Date.parse(selectedDates[0]) - Date.parse(currentDate)) / 1000
  );

  if (timeDifference > 0) {
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

let timer = null;
startBtn.addEventListener('click', () => {
  const seconds = document.querySelector('span[data-seconds]');
  const minutes = document.querySelector('span[data-minutes]');
  const hours = document.querySelector('span[data-hours]');
  const days = document.querySelector('span[data-days]');

  function addLeadingZero(num) {
    return num < 10 ? '0' + num : num.toString();
  }

  if (timeDifference > 0) {
    timer = setInterval(() => {
      timeDifference--;

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
    }, 1000);
  }
});
