const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let resultShown = false;

function updateDisplay(value) {
  display.textContent = value;
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (resultShown) {
      firstNumber = '';
      secondNumber = '';
      currentOperator = null;
      resultShown = false;
    }

    if (!currentOperator) {
      firstNumber += button.textContent;
      updateDisplay(firstNumber);
    } else {
      secondNumber += button.textContent;
      updateDisplay(secondNumber);
    }
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (!firstNumber) firstNumber = '0';
    if (secondNumber) return; // prevent changing operator after 2nd number started
    currentOperator = button.textContent;
  });
});

equalsButton.addEventListener('click', () => {
  if (!currentOperator) return;

  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber || '0');
  let result = 0;

  switch (currentOperator) {
    case '+':
      result = a + b;
      break;
    case '−':
      result = a - b;
      break;
    case 'x':
      result = a * b;
      break;
    case '÷':
      result = b !== 0 ? a / b : 'Error';
      break;
  }

  updateDisplay(result);
  firstNumber = result.toString();
  secondNumber = '';
  currentOperator = null;
  resultShown = true;
});

clearButton.addEventListener('click', () => {
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
  resultShown = false;
  updateDisplay('0');
});
