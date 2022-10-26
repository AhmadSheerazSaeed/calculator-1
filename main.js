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

// get value from the pressed button
for (let count = 0; count < buttonsElements.length; count++) {
  buttonsElements[count].addEventListener("click", () => {
    inputValue.value += buttonsElements[count].textContent;
  });
}

// get airthmetic operators on button pressed
for (let count = 0; count < calcButtonsElements.length; count++) {
  calcButtonsElements[count].addEventListener("click", () => {
    operatorForCalculations = calcButtonsElements[count].textContent;
    inputValue.value += operatorForCalculations;
  });
}

// show result after pressing the equal to button
equalButton.addEventListener("click", () => {
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
});

// function to display result of input
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
