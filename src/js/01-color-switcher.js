const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.body,
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let changeColorIntervalID;
let isIntervalSet;

function onStartBtnClick() {
  if (isIntervalSet === true) {
    return;
  } else {
    refs.startBtn.disabled = true;
    changeColorIntervalID = setInterval(() => {
      const currentBgColor = getRandomHexColor();
      refs.bodyEl.style.backgroundColor = currentBgColor;
    }, 1000);
    isIntervalSet = true;
  }
}

function onStopBtnClick() {
  clearInterval(changeColorIntervalID);
  refs.startBtn.disabled = false;
  isIntervalSet = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
