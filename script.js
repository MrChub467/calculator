let result = "";
let arg1 = "";
let arg2 = "";
let operator = "";
const displayText = document.querySelector(".display-text");
const numBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn")

// -------------------- Operation between two numbers -------------------- //
const equalBtn = document.querySelector("#equals").addEventListener("click", () => {
  operate(arg1, arg2, operator);
})
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
        result = ((num1 * 10) - (num2 * 10)) / 10;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "÷":
        result = division(num1, num2)
        break;
      case "/":
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

// -------------------- Update the Display -------------------- //
const clearBtn = document.querySelector("#clear")
clearBtn.addEventListener("click", clear)
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
  if (displayText !== "0") clearBtn.textContent = "C";
  else clearBtn.textContent = "AC";
}
function clear() {
  displayText.textContent = "0";
  arg1 = "";
  arg2 = "";
  operator = "";
  clearBtn.textContent = "AC";
}




// -------------------- Sign Support -------------------- //
const sign = document.querySelector("#sign").addEventListener("click", () => {
  if (!operator && arg1) {
    arg1 = -arg1;
    updateDisplay();
  } 
  else if (arg2){
    arg2 = -arg2;
    updateDisplay();
  }
  
});

// -------------------- Percent Support -------------------- //
const percent = document.querySelector("#percent").addEventListener("click", () => {
  if (!operator && arg1) {
    arg1 = arg1 / 100;
    updateDisplay();
  } 
  else if (arg2) {
    arg2 = arg2 / 100;
    updateDisplay();
  }
});

// -------------------- Decimal Support -------------------- //
const decimal = document.querySelector("#decimal").addEventListener("click", addDecimal);
function addDecimal() {
  if (!operator && !arg1.toString().includes(".")) {
    arg1 += ".";
  } 
  else if (!operator) {
    arg1 = ".";
  }
  else if(!arg2.toString().includes(".") && operator) {
    arg2 += ".";
  }
  updateDisplay();
}

// -------------------- Gets the two numbers -------------------- //
numBtns.forEach(button => {
  button.addEventListener("click", () => {
    addNumber(button.textContent);
  })
});
function addNumber(number) {
  if (!operator) {
    if (arg1 === "0" || result && !arg1.includes(".") || arg1.includes("e")) {
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

// -------------------- Gets the Operator -------------------- //
function getOperator(op) {
  if (operator === "" && arg1 !== "") {
    operator = op;
  }
  else if (operator && arg1 && arg2) {
    operate(arg1, arg2, operator);
    operator = op;
  }
}
operatorBtns.forEach(button => {
  button.addEventListener("click", () => {
    getOperator(button.textContent);
  });
});


// -------------------- Video Background -------------------- //
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

// -------------------- Keyboard Support -------------------- //
const KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/", "*", "-", "+", ".", "Enter" ]
const buttons = Array.from(document.getElementsByTagName("button"));

function removeClass(btn) {
  btn.classList.remove("color");
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (key === "Enter") {
    event.preventDefault();
  }
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
