const addition = (a, b) => a + b;
const subtraction = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;

function operate(num1, num2, operator) {
  switch(operator) {
    case "+":
      result = addition(num1, num2)
      break;
    case "-":
      result = subtract(num1, num2)
      break;
    case "*":
      result = multiply(num1, num2)
      break;
    case "/":
      result = divide(num1, num2)
      break;
  }
}

function updateDisplay() {
  displayText.textContent = arg1 + operator + arg2;
}

displayText = document.querySelector(".display-text");
let result = "";

let arg1 = "";
let arg2 = "";
let operator = "";

updateDisplay()
