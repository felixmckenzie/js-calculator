// const { run } = require("jest");

const initCalculator = (function () {
  const keys = document.querySelectorAll(".btn");
  const displayScreen = document.querySelector(".screen");
  let displayValue = "0";
  let firstOperand = null;
  let currentOperator = null;
  let waitingForOperand = false;

  const add = (a, b) => {
    return a + b;
  };

  const subtract = (a, b) => {
    return a - b;
  };

  const multiply = (a, b) => {
    return a * b;
  };

  const divide = (a, b) => {
    return a / b;
  };

  const updateDisplayScreen = (displayValue, displayScreen) => {
    displayScreen.textContent = displayValue;
  };

  const setDisplayValue = (digit, displayValue) => {
    if (waitingForOperand) {
      waitingForOperand = false;
      return (displayValue = digit);
    } else {
      return displayValue === "0" ? digit : (displayValue += digit);
    }
  };

  const appendDecimal = (decimal, displayValue) => {
    if(waitingForOperand){
      displayValue = "0."
      waitingForOperand = false
    }

    if (!displayValue.includes(decimal)) {
      displayValue += ".";
    }
    return displayValue;
  };

  const reset = () =>{
     displayValue = "0";
    firstOperand = null;
    currentOperator = null;
    waitingForOperand = false;
  }

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && waitingForOperand) {
      currentOperator = nextOperator;
      return;
    }

    if (!firstOperand) {
      firstOperand = inputValue;
    } else if (currentOperator) {
      const result = runCalculation(currentOperator, firstOperand, inputValue);
      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstOperand = result;
    }

    currentOperator = nextOperator;
    waitingForOperand = true;
  };

  const runCalculation = (operator, firstOperand, inputValue) => {
    switch (operator) {
      case "/":
        inputValue = divide(firstOperand, inputValue);
      case "x":
        inputValue = multiply(firstOperand, inputValue);
        break;
      case "-":
        inputValue = subtract(firstOperand, inputValue);
        break;
      case "+":
        inputValue = add(firstOperand, inputValue);
        break;
    }

    return inputValue;
  };

  return {
    handleClick: function () {
      keys.forEach((key) => {
        key.addEventListener("click", (event) => {
          const { target } = event;
          const { value } = target;

          if (target.classList.contains("number")) {
            displayValue = setDisplayValue(value, displayValue);
            updateDisplayScreen(displayValue, displayScreen);
          }

          if (target.classList.contains("decimal")) {
            displayValue = appendDecimal(value, displayValue);
            updateDisplayScreen(displayValue, displayScreen);
          }

          if (target.classList.contains("operator")) {
            handleOperator(value);
            updateDisplayScreen(displayValue, displayScreen);
          }

          if(target.classList.contains("clear")){
            reset()
            updateDisplayScreen(displayValue,displayScreen)
          }

        });
      });
    },
  };
})();

initCalculator.handleClick();

