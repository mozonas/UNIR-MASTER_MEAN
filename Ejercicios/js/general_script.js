'use strict'
const userName='';
let toggleShowOwnHiddenOtherExercisesBool= false

function toggleShowOwnHiddenOtherExercises(event){

    //.classList.add( 'rotando' )
  if (toggleShowOwnHiddenOtherExercisesBool=== false){
    ShowDescription(event);
  }
  else {
    HideDescriptions(event);
  }

}
function ShowDescription(event){
  toggleShowOwnHiddenOtherExercisesBool= true;
    const boton = event.target;
    boton.innerHTML='&#x2193;'
  const padre = boton.parentElement;
  const abuelo=padre.parentElement;
  console.log(abuelo);
  const articulos = abuelo.querySelectorAll("article");
  articulos.forEach(art => {
    art.classList.remove('hiddeDescription');
  });
}
function HideDescriptions(event){
  toggleShowOwnHiddenOtherExercisesBool= false;
  const boton = event.target;
  boton.innerHTML='&#x2192';
  const padre = boton.parentElement;
  const abuelo=padre.parentElement;
  console.log(abuelo);
  const articulos = abuelo.querySelectorAll("article");
  articulos.forEach(art => {
    art.classList.add('hiddeDescription');
  });
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
function Init(){
  setChrono();
  startQuiz();
}
function setChrono(){
  if (timerId !== null) return;        // ya está corriendo
  startTime = Date.now();
  timerId = setInterval(updateChronometer, 10); // actualiza cada 10 ms
}

function startQuiz() {

  const userName=prompt("Por favor, ingrese su nombre:");
  let counter=0;
  let responses=['Madrid','Londres','Paris'];
  let status=false;


  let response1=prompt(userName+" ¿Capital de España?");
  const quizStatus = document.querySelector("article > .solutionContent > .quizStatus");
  const counterDiv = document.querySelector("article > .solutionContent > .counter"); 
  debugger;
  quizStatus.innerHTML=""; // limpiamos
  counterDiv.innerHTML= counter ;
  if (response1.toLowerCase()===responses[0].toLowerCase()){
    counter++;
    status= true;
    counterDiv.innerHTML= counter ;
    quizStatus.innerHTML=userName+",Felicidades! Has respondido correctamente a la primera pregunta.";
  } 
  else {
    quizStatus.innerHTML=userName+" tienes que estudiar más. La respuesta correcta es "+ responses[0];
  }
  if (status===true){
    status=false; // reiniciamos para la siguiente pregunta
    let response2=prompt(userName+" ¿Capital de Reino Unido?"); 
    if (response2.toLowerCase()===responses[1].toLowerCase()){
      counter++;
      status= true;
      counterDiv.innerHTML= counter ;
      quizStatus.innerHTML=userName+",Felicidades! Has respondido correctamente a la segunda pregunta.";
    } 
    else {
      quizStatus.innerHTML=userName+" tienes que estudiar más. La respuesta correcta es "+ responses[1];
    }
  }
  if (status===true){
    status=false; // reiniciamos para la siguiente pregunta
    let response3=prompt(userName +" ¿Capital de Francia?");   
    if (response3.toLowerCase()===responses[2].toLowerCase()){
      counter++;
      counterDiv.innerHTML= counter ;
      quizStatus.innerHTML="Felicidades "+ userName +",todas las respuestas son correctas";
      //endQuiz();
    }
    else {
      quizStatus.innerHTML=userName+" tienes que estudiar más. La respuesta correcta es "+ responses[2];
    }
      

  }
}

function endQuiz() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  elapsedTime = 0;
}
updateChronometer(); // inicializa a 00:00:000