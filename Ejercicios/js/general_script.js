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

//lógica ejercicio 2

function compareNumbers(){
  const numeroA= parseFloat(document.getElementById("numeroA").value);
  const numeroB= parseFloat(document.getElementById("numeroB").value);
  let resultText="";  
  if (isNaN(numeroA) || isNaN(numeroB)){
    resultText="Por favor, ingrese números válidos en ambos campos.";
  } 
  else {
    if (numeroA > numeroB){
      resultText="El número "+ numeroA + " es mayor que "+ numeroB;
    }
    else if (numeroA < numeroB){
      resultText="El número "+ numeroA + " es menor que "+ numeroB;
    }
    else {
      resultText="Ambos números son iguales.";
    } 
  }
  document.getElementById("resultCompareNumbers").innerText=resultText;
}

//logica ejercicio 3
function checkEvenOdd(){
  const numeroQ= parseInt(document.getElementById("numeroQ").value);
  let resultEvenOddText="";
  let resultMultipleOf3Text=""; 
  const nodoResultadoresultadoE3=document.getElementById("resultEvenOdd");
  nodoResultadoresultadoE3.classList.add('resultadoE3statusZero');
  nodoResultadoresultadoE3.classList.remove('resultadoE3rojo','resultadoE3verde','resultadoE3azul','resultadoE3amarillo');

  if (isNaN(numeroQ)){
    resultEvenOddText="Por favor, ingrese un número válido.";
    resultMultipleOf3Text="";
    nodoResultadoresultadoE3.classList.add('resultadoE3rojo');
  }
  else {
    if (numeroQ % 2 === 0){
      resultEvenOddText="El número "+ numeroQ + " es par.";
      nodoResultadoresultadoE3.classList.add('resultadoE3verde');
    }
    else {
      resultEvenOddText="El número "+ numeroQ + " es impar.";
      nodoResultadoresultadoE3.classList.add('resultadoE3azul');
    }
    if (numeroQ % 3 === 0){
      resultMultipleOf3Text="Además, el número "+ numeroQ + " es múltiplo de 3.";
      nodoResultadoresultadoE3.classList.add('resultadoE3amarillo');
    }
    else {
      resultMultipleOf3Text="Además, el número "+ numeroQ + " no es múltiplo de 3.";
    } 
  }
  document.getElementById("resultEvenOdd").innerText=resultEvenOddText;
  document.getElementById("resultMultipleOf3").innerText=resultMultipleOf3Text;
  let esprimo=esPrimo(numeroQ);
  if (esprimo){
    const nodoPrimos=document.querySelector('.sonPrimos');
    nodoPrimos.innerText="Números primos encontrados hasta ahora: " + primusNumberGlobal.join(", ");

    document.querySelector('.esPrimo').innerText="El número "+ numeroQ + " es primo.";
  }
} 

let primusNumberGlobal=[];

function esPrimo(num) {
  // esta lógica falla con el numero 3
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
    else{
      addSiNoExiste(primusNumberGlobal, num);
      return true;
    }
  }
}

function addSiNoExiste(lista, n) {
  if (!lista.includes(n)) {
    lista.push(n);
  }
}