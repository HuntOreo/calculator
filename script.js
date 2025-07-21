const delBtn = document.querySelector('.del');
const intBtns = document.querySelectorAll('.int');
const operatorBtns = document.querySelectorAll('.operator');
let _CURRENT_OPERATOR = null;
let _PREVIOUS_RESULT = null;

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
  displayElms.innerText = '';
  _CURRENT_OPERATOR = null;
  _PREVIOUS_RESULT = null;
}

function handleOperator(elem) {
  const operator = elem.innerText;

  if (operator == '=') {
    let input = document.querySelector('.display .value').innerText;
    renderInputs(elem);

    const arr = input.split(_CURRENT_OPERATOR);
    const operandOne = Number(arr[0]);
    const operandTwo = Number(arr[1]);

    const result = calculate(operandOne, operandTwo, _CURRENT_OPERATOR);

    _CURRENT_OPERATOR = null;
    _PREVIOUS_RESULT = null;

    input = document.querySelector('.display .value')
    input.innerText = `${result}`;
    return;
  }

  if (typeof _PREVIOUS_RESULT !== 'number') {
    const input = document.querySelector('.display .value').innerText;
    const justNum = input.substring(0, input.length - 1);
    renderInputs(elem);

    _CURRENT_OPERATOR = operator;
    _PREVIOUS_RESULT = Number(justNum);

  } else {
    let input = document.querySelector('.display .value').innerText;
    renderInputs(elem);

    const arr = input.split(_CURRENT_OPERATOR);
    const operandOne = Number(arr[0]);
    const operandTwo = Number(arr[1]);

    _CURRENT_OPERATOR = operator;
    const result = calculate(operandOne, operandTwo, _CURRENT_OPERATOR);
    _PREVIOUS_RESULT = result;

    input = document.querySelector('.display .value');
    input.innerText = `${result}${_CURRENT_OPERATOR}`;
  }
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
  elem.addEventListener('click', (event) => handleOperator(event.target)))