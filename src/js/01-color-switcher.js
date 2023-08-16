const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.body,
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let changeColorIntervalID;

function onStartBtnClick() {
  changeColorIntervalID = setInterval(() => {
    const currentBgColor = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = currentBgColor;
    refs.startBtn.setAttribute('disabled', 'disabled');
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(changeColorIntervalID);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
