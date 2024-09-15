const division = (a, b) => {
  if (b !== 0) {return a / b}
  else {return "Error"}
};

function operate(num1, num2, op) {
  if (num1 && num2) {
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
    if (result.toString().length > 8) result = parseFloat(result).toExponential(4);
    displayText.textContent = result;
    arg1 = result;
    arg2 = ""
    operator = "";
  }
  else {
    displayText.textContent = "0";
    arg1 = "";
    arg2 = "";
  }
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
  arg1 = "";
  arg2 = "";
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

function addDecimal() {
  if (!operator && !arg1.includes(".")) {
    arg1 += ".";
  } 
  else if(!arg2.includes(".") && operator) {
    arg2 += ".";
  }
  updateDisplay();
}

const decimal = document.querySelector("#decimal").addEventListener("click", addDecimal);

function addNumber(number) {
  if (!operator) {
    if (arg1 === "0" || result) {
      arg1 = number;
      result = "";
    } else {
      arg1 += number;
    }
  }
  else {
    if (arg2 === "0") {
      arg2 = number;
    } else {
      arg2 += number;
    }
  }
  updateDisplay()
}

numBtns.forEach(button => {
  button.addEventListener("click", () => {
    addNumber(button.textContent);
  })
});

function getOperator(op) {
  if (operator === "" && arg1 !== "") {
    operator = op;
  }
}

operatorBtns.forEach(button => {
  button.addEventListener("click", () => {
    getOperator(button.textContent);
  });
});

let result = "";
let arg1 = "";
let arg2 = "";
let operator = "";

const video = document.querySelector("#video")
let vidControls = document.querySelector("#start-stop")
vidControls.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    vidControls.textContent = "Pause";
  } else {
    video.pause();
    vidControls.textContent = "Play";
  }
})

function removeClass(btn) {
  btn.classList.remove("color");
}

const KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/", "*", "-", "+", ".", "Enter" ]
const buttons = Array.from(document.getElementsByTagName("button"));
document.addEventListener('keydown', function(event) {
  const key = event.key; 
  buttons.forEach(button => {
    if (button.textContent === key ||
      (key === "/" && button.textContent === "÷") ||
      (key === "Enter" && button.textContent === "=")
    ) {
      button.classList.add("color")
      setTimeout(removeClass, 100, button);
    }
  })
  if (KEYS.includes(key)) {
    if (!isNaN(key)) {
      addNumber(key);
    }
    else if (key === "Enter") {
      operate(arg1, arg2, operator);
    }
    else if (key === ".") {
      addDecimal();
    }
    else {
      getOperator(key);
    }
  }
});
