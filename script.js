const delBtn = document.querySelector('.del');
const intBtns = document.querySelectorAll('.int');
const operatorBtns = document.querySelectorAll('.operator');

function betterCalc(input) {

  const inputStr = "1+23*5-3";
  const inputArr = inputStr.split('');
  console.log('inputArr')
  // receive input string
  // convert string into an array
  // search for each operator
  // When the operator is found, grab the Operands
  // store expression into an object, then store into array
  // send each object to its relevant function
  // finally combine the results into a a single int.
}

function calculate(intOne, intTwo, operator) {
  try {
    errorHandler(intOne, intTwo, operator);

    switch (operator) {
      case '+':
        return add(intOne, intTwo);
      case '-':
        return subtract(intOne, intTwo);
      case '*':
        return multiply(intOne, intTwo);
      case '/':
        return divide(intOne, intTwo);
    }

  } catch (err) {
    alert(err.message);
  }
}

function add(intOne, intTwo) {
  return intOne + intTwo;
}

function subtract(intOne, intTwo) {
  return intOne - intTwo;
}

function multiply(intOne, intTwo) {
  return intOne * intTwo;
}

function divide(intOne, intTwo) {
  return intOne / intTwo;
}

function errorHandler(intOne, intTwo, operator) {
  const invalidOperatorErr = new Error('Invalid Operator');
  const invalidTypeErr = new Error('Not a Number');

  if (
    operator != '+' &&
    operator != '-' &&
    operator != '*' &&
    operator != '/'
  ) {
    throw invalidOperatorErr;
  }

  if (typeof intOne != 'number' || typeof intTwo != 'number') {
    throw invalidTypeErr;
  }
}

function deleteVal() {
  const displayElms = document.querySelector('.display .value');
  const displayArr = displayElms.innerText.split('');

  displayArr.pop();
  displayElms.innerText = displayArr.join('');
}

function renderInputs(elem) {
  const value = elem.innerText;
  const display = document.querySelector('.display .value');
  display.innerText += value;
}

delBtn.addEventListener('click', (event) => deleteVal(event.target));
intBtns.forEach(elem =>
  elem.addEventListener('click', (event) => renderInputs(event.target)));
operatorBtns.forEach(elem =>
  elem.addEventListener('click', (event) => {
    if (!event.target.classList.contains('equal')) {
      renderInputs(event.target);
    };
  }))

console.log('add: ' + calculate(1, 2, '+'));
console.log('subtract: ' + calculate(5, 3, '-'));
console.log('multiply: ' + calculate(7, 2, '*'));
console.log('divide: ' + calculate(6, 2, '/'));