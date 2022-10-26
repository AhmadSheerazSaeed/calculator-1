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

// console.log(buttonsElements);

for (let count = 0; count < buttonsElements.length; count++) {
  // console.log(buttonsElements[count]);
  buttonsElements[count].addEventListener("click", () => {
    // console.log(buttonsElements[count].textContent);
    inputValue.value += buttonsElements[count].textContent;
  });
}

for (let count = 0; count < calcButtonsElements.length; count++) {
  // console.log(calcButtonsElements[count].textContent);
  calcButtonsElements[count].addEventListener("click", () => {
    operatorForCalculations = calcButtonsElements[count].textContent;
    num1 = inputValue.value;
    inputValue.value = "";
  });
}

equalButton.addEventListener("click", () => {
  num2 = inputValue.value;
  inputValue.value = "";
  calculationOfNumbers(num1, num2, operatorForCalculations);
});

function calculationOfNumbers(num1 = 0, num2 = 0, calcOperator) {
  // console.log("num1 : " + num1);
  // console.log("num2 : " + num2);
  // console.log("operator : " + calcOperator);

  switch (calcOperator) {
    case "+":
      // console.log("+");
      inputResult.value = `${Number(num1)} + ${Number(num2)} = ${
        Number(num1) + Number(num2)
      }`;
      // resultOfCalculations = num1 + num2;
      break;
    case "-":
      // console.log("-");
      inputResult.value = `${Number(num1)} - ${Number(num2)} = ${
        Number(num1) - Number(num2)
      }`;
      break;
    case "*":
      // console.log("*");
      inputResult.value = `${Number(num1)} * ${Number(num2)} = ${
        Number(num1) * Number(num2)
      }`;
      break;
    case "/":
      // console.log("/");
      inputResult.value = `${Number(num1)} / ${Number(num2)} = ${
        Number(num1) / Number(num2)
      }`;
      break;
    default:
      inputResult.value = "";
  }
}

resetButton.addEventListener("click", () => {
  num1 = 0;
  num2 = 0;
  operatorForCalculations = "";
  inputValue.value = "";
  inputResult.value = "";
});
