import { clampMinutes, formatTime, getNextTick, secondsFromMinutes } from "./timer-core.js";
import { loadStoredMinutes, saveStoredMinutes } from "./storage.js";

const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const statusEl = document.querySelector("#status");
const customMinutesEl = document.querySelector("#custom-minutes");
const presetButtons = [...document.querySelectorAll(".preset")];
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");

let selectedMinutes = clampMinutes(loadStoredMinutes() ?? customMinutesEl.value);
let remainingSeconds = secondsFromMinutes(selectedMinutes);
let timerId = null;

function render() {
  const time = formatTime(remainingSeconds);
  minutesEl.textContent = time.minutes;
  secondsEl.textContent = time.seconds;
}

function setStatus(message) {
  statusEl.textContent = message;
}

function stopTimer() {
  window.clearInterval(timerId);
  timerId = null;
}

function selectDuration(minutes) {
  selectedMinutes = clampMinutes(minutes);
  remainingSeconds = secondsFromMinutes(selectedMinutes);
  customMinutesEl.value = String(selectedMinutes);
  saveStoredMinutes(selectedMinutes);

  presetButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.minutes) === selectedMinutes);
  });

  render();
}

function startTimer() {
  if (timerId !== null) {
    return;
  }

  if (remainingSeconds === 0) {
    remainingSeconds = secondsFromMinutes(selectedMinutes);
  }

  setStatus("Timer running.");
  timerId = window.setInterval(() => {
    remainingSeconds = getNextTick(remainingSeconds);
    render();

    if (remainingSeconds === 0) {
      stopTimer();
      setStatus("Time is up.");
    }
  }, 1000);
}

function pauseTimer() {
  if (timerId === null) {
    return;
  }

  stopTimer();
  setStatus("Paused.");
}

function resetTimer() {
  stopTimer();
  remainingSeconds = secondsFromMinutes(selectedMinutes);
  render();
  setStatus("Ready when you are.");
}

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stopTimer();
    selectDuration(button.dataset.minutes);
    setStatus(`${button.dataset.minutes} minute timer selected.`);
  });
});

customMinutesEl.addEventListener("change", () => {
  stopTimer();
  selectDuration(customMinutesEl.value);
  setStatus("Custom timer selected.");
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

selectDuration(selectedMinutes);
