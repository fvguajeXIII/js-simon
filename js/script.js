//Elementi del DOM
const numbersList = document.getElementById(`numbers-list`);
const countdown = document.getElementById(`countdown`);
const answersForm = document.getElementById(`answer-form`);
const inputGroup = document.getElementById(`input-group`);
const message = document.getElementById(`message`);
const instructions = document.getElementById(`instructions`);

//Genera 5 numeri casuali unici tra 1 e 50
function generateRandomNumbers(count, min, max){
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return Array.from(numbers);
}

const numbersToGuess = generateRandomNumbers (5, 1, 50);

//Mostra i numeri
numbersList.innerHTML = numbersToGuess
.map(num => `<li class="fs-1 fw-bold">${num}</li>`)
.join(``);