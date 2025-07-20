const delBtn = document.querySelector('.del');
const intBtns = document.querySelectorAll('.int');
const operatorBtns = document.querySelectorAll('.operator');
let currentOperator = '';
let _OPERAND_ONE, _OPERANDtWO = null;

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

function handleOperator(elem) {
  const operator = elem.innerText;
  if (typeof _OPERAND_ONE !== 'number') {
    const input = document.querySelector('.display .value').innerText;
    const justNum = input.substring(0, input.length - 1);
    renderInputs(elem);

    _OPERAND_ONE = Number(justNum);
  } else {
    let input = document.querySelector('.display .value').innerText;
    renderInputs(elem);

    const arr = input.split(operator);
    const valueOne = Number(arr[0]);
    const valueTwo = Number(arr[1]);

    const result = calculate(valueOne, valueTwo, operator);
    _OPERAND_ONE = result;

    input = document.querySelector('.display .value');
    input.innerText = `${result}${elem.innerText}`;
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

console.log('add: ' + calculate(1, 2, '+'));
console.log('subtract: ' + calculate(5, 3, '-'));
console.log('multiply: ' + calculate(7, 2, '*'));
console.log('divide: ' + calculate(6, 2, '/'));