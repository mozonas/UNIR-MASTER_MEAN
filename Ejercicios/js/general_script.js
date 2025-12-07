'use strict'
const userName='';

function toggleShowOwnHiddenOtherExercises(){
    alert ('Nothing now');
}

function toggleShowOrHiddeSolution(){
alert ('Nothing now');
}


let timerId = null;
let startTime = 0;
let elapsedTime = 0; 

function updateChronometer() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime; // ms totales

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const milliseconds = diff % 1000;

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
  document.getElementById("milliseconds").textContent =
    String(milliseconds).padStart(3, "0");
}

function startQuiz() {
  if (timerId !== null) return;        // ya está corriendo
  startTime = Date.now();
  timerId = setInterval(updateChronometer, 10); // actualiza cada 10 ms
}

function endQuiz() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  elapsedTime = 0;
}
updateChronometer(); // inicializa a 00:00:000