function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const startBtn = body.querySelector('button[data-start]');
const stopBtn = body.querySelector('button[data-stop]');
let colorTimer;

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  colorTimer = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  clearInterval(colorTimer);
});
