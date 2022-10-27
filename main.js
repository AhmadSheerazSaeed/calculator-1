"use strict";

let num1 = 0;
let num2 = 0;
let resultOfCalculations = 0;
let operatorForCalculations = "";

const inputResult = document.querySelector("#result");
const inputValue = document.querySelector("#inputValue");
const buttonsElements = document.querySelectorAll(".digitButtons");
const calcButtonsElements = document.querySelectorAll(".calcButtons");
const equalButton = document.querySelector(".equalButton");
const resetButton = document.querySelector(".resetButton");

// get value from the digit buttons pressed
for (let count = 0; count < buttonsElements.length; count++) {
  buttonsElements[count].addEventListener("click", () => {
    // inputValue.value += buttonsElements[count].textContent;
    getDigits(buttonsElements[count].textContent);
  });
}

// input from keyboard
document.addEventListener("keydown", (event) => {
  // console.log(event);
  if (
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "0"
  ) {
    getDigits(event.key);
  } else if (event.key === "," || event.key === ".") {
    // console.log(inputValue.value.indexOf("."));
    getDigits(".");
  }

  // get arithmetic operator
  if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    getArithmeticOperator(event.key);
  }

  if (event.key === "Enter") {
    calcValues();
  }
});

// function to display input in text box
function getDigits(digitValue) {
  inputValue.value += digitValue;
}

// get arithmetic operators on button pressed
for (let count = 0; count < calcButtonsElements.length; count++) {
  calcButtonsElements[count].addEventListener("click", () => {
    operatorForCalculations = calcButtonsElements[count].textContent;
    // inputValue.value += operatorForCalculations;

    getArithmeticOperator(operatorForCalculations);
  });
}

// function to display arithmetic operator in input field
function getArithmeticOperator(arithmeticOperator) {
  operatorForCalculations = arithmeticOperator;
  inputValue.value += arithmeticOperator;
}

// show result after pressing the equal to button
equalButton.addEventListener("click", calcValues);

// function to get values and send these values for calculation
function calcValues() {
  // num2 = inputValue.value;
  num1 = inputValue.value.substring(
    0,
    inputValue.value.indexOf(operatorForCalculations)
  );
  num2 = inputValue.value.substring(
    inputValue.value.indexOf(operatorForCalculations) + 1,
    inputValue.value.length
  );
  calculationOfNumbers(num1, num2, operatorForCalculations);
  inputValue.value = "";
}

// function to calculate result of input
function calculationOfNumbers(num1 = 0, num2 = 0, calcOperator = "+") {
  switch (calcOperator) {
    case "+":
      inputResult.value = `${Number(num1)} + ${Number(num2)} = ${
        Number(num1) + Number(num2)
      }`;
      break;
    case "-":
      inputResult.value = `${Number(num1)} - ${Number(num2)} = ${
        Number(num1) - Number(num2)
      }`;
      break;
    case "*":
      inputResult.value = `${Number(num1)} * ${Number(num2)} = ${
        Number(num1) * Number(num2)
      }`;
      break;
    case "/":
      inputResult.value = `${Number(num1)} / ${Number(num2)} = ${
        Number(num1) / Number(num2)
      }`;
      break;
    default:
      inputResult.value = "";
  }
}

// reset button event listner
resetButton.addEventListener("click", () => {
  num1 = 0;
  num2 = 0;
  operatorForCalculations = "";
  inputValue.value = "";
  inputResult.value = "";
});
