const division = (a, b) => {
  if (b !== 0) {return a / b}
  else {return "Error"}
};

function operate(num1, num2, op) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch(op) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "÷":
      result = division(num1, num2)
      break;
  }
  if (result.toString().length > 6) result = parseFloat(result).toExponential(4);
  displayText.textContent = result;
  arg1 = result;
  arg2 = "0"
  operator = "";
}

function updateDisplay() {
  if (operator != "" && arg2 != "") {
    if (arg2.length > 13) {
      displayText.textContent = parseFloat(arg2).toExponential(2);
    } else displayText.textContent = arg2;
  }
  else {
    if (arg1.length > 13) {
      displayText.textContent = parseFloat(arg1).toExponential(2);
    } else displayText.textContent = arg1;
  }
}

function clear() {
  displayText.textContent = "0";
  arg1 = "0";
  arg2 = "0";
  operator = "";
}



const displayText = document.querySelector(".display-text");
const numBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn")
const equalBtn = document.querySelector("#equals").addEventListener("click", () => {
  operate(arg1, arg2, operator);
})
const clearBtn = document.querySelector("#clear").addEventListener("click", clear)
const sign = document.querySelector("#sign").addEventListener("click", () => {
  if (!operator) {
    arg1 = -arg1;
  } else {
    arg2 = -arg2;
  }
  updateDisplay();
});
const percent = document.querySelector("#percent").addEventListener("click", () => {
  if (!operator) {
    arg1 = arg1 / 100;
  } else {
    arg2 = arg2 / 100;
  }
  updateDisplay();
});
const decimal = document.querySelector("#decimal").addEventListener("click", () => {
  if (!operator && !arg1.includes(".")) {
    arg1 += ".";
  } 
  else if(!arg2.includes(".")) {
    arg2 += ".";
  }
  updateDisplay();
});

numBtns.forEach(button => {
  button.addEventListener("click", () => {
    if (!operator) {
      if (arg1 === "0" || result) {
        arg1 = button.textContent
        result = "";
      } else {
        arg1 += button.textContent;
      }
      
    }
    else {
      if (arg2 === "0") {
        arg2 = button.textContent
      } else {
        arg2 += button.textContent;
      }
      
    }
    updateDisplay()
  });
});

operatorBtns.forEach(button => {
  button.addEventListener("click", () => {
    if (operator === "") {
      operator = button.textContent;
    }
  });
});

let result = "";
let arg1 = "0";
let arg2 = "0";
let operator = "";

