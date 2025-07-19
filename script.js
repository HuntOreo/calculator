const delBtn = document.querySelector('.del');
const intBtns = document.querySelectorAll('.int');
const operatorBtns = document.querySelectorAll('.operator');
let expression = "0";

function betterCalc(input) {
  const inputStr = input;
  const inputArr = inputStr.split('');
  const operators = grabOperators(inputArr);
  const messyExprs = [];

  operators.forEach((obj, index) => {
    const expression = grabVal(inputArr, obj, index);
    messyExprs.push(expression);
  })

  const cleanedExprs = cleanExpressions(messyExprs);
  // console.log(cleanedExprs);

  buildExpression(cleanedExprs);
}

function cleanExpressions(arr) {
  arr.sort((a, b) => a.weight > b.weight);
  return arr;
}

function grabVal(arr, obj, objIndex) {
  const index = obj.index;
  let left, right, weight;
  let leftIndex = []
  let rightIndex = []

  switch (obj.operator) {
    case '*':
      weight = 1;
      break;
    case '/':
      weight = 2;
      break;
    case '+':
      weight = 3;
      break;
    case '+':
      weight = 4;
      break;
  }

  // collect neighboring ints to form operand
  for (let i = index - 1; i >= 0; i--) {
    if (Number(arr[i]) || arr[i] == '0') {
      if (!left) {
        left = arr[i];
      } else if (left) {
        left += arr[i];
      }
      leftIndex.push(arr[i])
    } else {
      break;
    }
  }

  for (let i = index + 1; i < arr.length; i++) {
    if (Number(arr[i]) || arr[i] == '0') {
      if (!right) {
        right = arr[i];
      } else {
        right += arr[i];
      }
      rightIndex.push(arr[i]);
    } else {
      break;
    }
  }

  if (objIndex > 0) {
    let leftArr = left.split('');
    leftArr.reverse();
    left = leftArr.join('');
    leftIndex = leftIndex.reverse();
  }

  return {
    leftOperand: {
      value: left,
      index: leftIndex,
    },
    rightOperand: {
      value: right,
      index: rightIndex,
    },
    operand: obj.operator,
    weight: weight
  };
}


function grabOperators(arr) {
  const operators = [];

  arr.forEach((item, index) => {
    switch (item) {
      case '+':
        expression = {
          operator: item,
          index: index,
        };
        operators.push(expression);
        break;
      case '-':
        expression = {
          operator: item,
          index: index,
        };
        operators.push(expression);
        break;
      case '*':
        expression = {
          operator: item,
          index: index,
        };
        operators.push(expression);
        break;
      case '/':
        expression = {
          operator: item,
          index: index,
        };
        operators.push(expression);
        break;
    };
  });

  return operators;
}

function buildExpression(expressions) {
  expressions.reduce((previous, current) => {
    console.log(previous, current);
    return {}
  }, {});
}

// function calculate(intOne, intTwo, operator) {
//   try {
//     errorHandler(intOne, intTwo, operator);

//     switch (operator) {
//       case '+':
//         return add(intOne, intTwo);
//       case '-':
//         return subtract(intOne, intTwo);
//       case '*':
//         return multiply(intOne, intTwo);
//       case '/':
//         return divide(intOne, intTwo);
//     }

//   } catch (err) {
//     alert(err.message);
//   }
// }

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

betterCalc('0+23+5/7-7');