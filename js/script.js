// Genera 5 numeri casuali unici tra 1 e 50
function generateRandomNumbers(count, min, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
}

const numbersToGuess = generateRandomNumbers(5, 1, 50);

// Elementi DOM
const numbersList = document.getElementById('numbers-list');
const countdown = document.getElementById('countdown');
const answersForm = document.getElementById('answers-form');
const inputGroup = document.getElementById('input-group');
const message = document.getElementById('message');
const instructions = document.getElementById('instructions');

// Mostra i numeri
numbersList.innerHTML = numbersToGuess
  .map(num => `<li class="fs-1 fw-bold">${num}</li>`)
  .join('');

// Countdown
let timeLeft = 30;
countdown.textContent = timeLeft;

const timer = setInterval(() => {
  timeLeft--;
  countdown.textContent = timeLeft;

  // Dopo 10 secondi nascondi i numeri e mostra il form
  if (timeLeft === 20) {
    numbersList.innerHTML = '';
    answersForm.classList.remove('d-none');
    instructions.textContent = 'Inserisci i numeri che ricordi!';
  }

  // Dopo 0 secondi blocca tutto
  if (timeLeft === 0) {
    clearInterval(timer);
    countdown.textContent = 'Tempo scaduto!';
    answersForm.classList.add('d-none');
    instructions.textContent = 'Tempo scaduto! Ricarica la pagina per riprovare.';
  }
}, 1000);

// Gestione submit del form
answersForm.addEventListener('submit', function (e) {
  e.preventDefault();
  clearInterval(timer);

  // Prendi i valori inseriti
  const userNumbers = Array.from(inputGroup.querySelectorAll('input')).map(input =>
    parseInt(input.value, 10)
  );

  // Trova i numeri indovinati (senza doppioni)
  const guessed = numbersToGuess.filter(num => userNumbers.includes(num));

  // Mostra il risultato
  message.classList.remove('text-danger');
  message.classList.add('text-success');
  message.innerHTML = `Hai indovinato ${guessed.length} numer${guessed.length === 1 ? 'o' : 'i'}: <strong>${guessed.join(', ') || 'Nessuno'}</strong>.<br>I numeri erano: <strong>${numbersToGuess.join(', ')}</strong>`;

  // Disabilita il form
  Array.from(inputGroup.querySelectorAll('input')).forEach(input => input.disabled = true);
  answersForm.querySelector('button').disabled = true;
});