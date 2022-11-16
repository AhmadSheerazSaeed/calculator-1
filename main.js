"use strict";

// variables

let chkArithmeticOperator = false; // to check that if arithmetic operator has been entered then the next entered character would not be any operator again
let chkPointEnter = false; // to check that the point cannot be entered two times in the same figure

// elements
const inputValue = document.querySelector(".inputDisplay");
const digitBtns = document.querySelectorAll(".btnsForCalc");
const clearBtn = document.querySelector(".clearBtn");
const displayResult = document.querySelector(".resultDisplay");
const backspaceBtn = document.querySelector(".backspaceBtn");

// event listeners

// input of digits and math operators entered from keyboard
document.addEventListener("keydown", (event) => {
  //   console.log(event.key);
  chkInput(event.key);
});

// event for clear button
clearBtn.addEventListener("click", () => {
  inputValue.textContent = "";
  displayResult.textContent = "";
});

// get arithmetic operators on button pressed
// console.log(digitBtns.textContent);
for (let count = 0; count < digitBtns.length; count++) {
  digitBtns[count].addEventListener("click", () => {
    chkInput(digitBtns[count].textContent);
  });
}

backspaceBtn.addEventListener("click", () => {
  deleteLastInput();
});

// functions

function deleteLastInput() {
  inputValue.textContent = inputValue.textContent.slice(0, -1);
  inputValueArray();
  if (inputValue.textContent.length === 0) {
    displayResult.textContent = "";
  }
}

// function to validate input
function chkInput(eventKey) {
  if (
    eventKey === "1" ||
    eventKey === "2" ||
    eventKey === "3" ||
    eventKey === "4" ||
    eventKey === "5" ||
    eventKey === "6" ||
    eventKey === "7" ||
    eventKey === "8" ||
    eventKey === "9" ||
    eventKey === "0"
  ) {
    inputValue.textContent += eventKey;
    chkArithmeticOperator = false;
    inputValueArray();
  } else if (
    (eventKey === "," || eventKey === ".") &&
    chkPointEnter === false
  ) {
    // console.log("CHECKING , ", inputValue.textContent.indexOf("."));
    chkArithmeticOperator = false;
    inputValue.textContent += ".";
    inputValueArray();
    if (inputValue.textContent.indexOf(".") > 0) {
      chkPointEnter = true;
    }
  }

  // get arithmetic operator when digits already entered
  if (
    (eventKey === "+" ||
      eventKey === "-" ||
      eventKey === "*" ||
      eventKey === "/") &&
    chkArithmeticOperator === false &&
    inputValue.textContent.length > 0
  ) {
    inputValue.textContent += eventKey;
    chkArithmeticOperator = true;
    chkPointEnter = false;
    inputValueArray();
  }

  // only minus(-) arithmetic operator is allowed
  // when input field is empty
  else if (
    eventKey === "-" &&
    chkArithmeticOperator === false &&
    inputValue.textContent.length === 0
  ) {
    inputValue.textContent += eventKey;
    chkArithmeticOperator = true;
    inputValueArray();
  }

  if (eventKey === "Backspace") {
    deleteLastInput();
  }

  if (eventKey === "Enter") {
    // console.log(typeof inputValue);
    // let inputValueToString = JSON.stringify(inputValue.value);
    // console.log(typeof inputValueToString);
    // //console.log(allDigitsInInput);
    // // console.log(inputValue.value.length);
    // // calcValues();
    // calArrayDigits();
  }
}

function inputValueArray() {
  //   console.log(inputValue.textContent);
  //   console.log(inputValue.textContent.split(""));

  const arrayOfAllValues = inputValue.textContent.split("");
  //   console.log(arrayOfAllValues);
  calculateAllValues(arrayOfAllValues);
}

// calculation from an array of values
function calculateAllValues(myArray) {
  let operatorCount = 0;

  const operatorsInArray = myArray.filter((elementValues) => {
    if (
      elementValues === "/" ||
      elementValues === "*" ||
      elementValues === "-" ||
      elementValues === "+"
    ) {
      return true;
    }
  });

  //   console.log("original array : ", myArray);

  // console.log("array with operators : ", operatorsInArray);

  // console.log("first position of + : ", myArray.indexOf("+"));

  // empty arrays to store the selected elements
  let valuesFromArray = [];
  let valuesFromArrayLastElement = [];

  // variables to store elements of the above declared arrays as strings
  let valueForCalculation = "";
  let valueForCalculationLastValue = "";

  // to store the arithmetic operator
  let result = 0;
  let firstValue = 0;
  let secondValue = 0;
  let lastValue = 0;
  let mathOperator = "";
  let mathOperatorLastElement = "";

  //
  for (let count = 0; count < operatorsInArray.length; count++) {
    // console.log(
    //   "index of the operator : ",
    //   myArray.indexOf(operatorsInArray[count]) +
    //     "  and the operator is : " +
    //     operatorsInArray[count] +
    //     " and the count is : " +
    //     count
    // );

    if (myArray.indexOf(operatorsInArray[count]) === 0) {
      valuesFromArray = myArray.splice(
        0,
        myArray.indexOf(operatorsInArray[count], operatorsInArray[count] + 1)
      );
    } else {
      valuesFromArray = myArray.splice(
        0,
        myArray.indexOf(operatorsInArray[count])
      );
    }
    if (operatorsInArray.length - 1 === count) {
      valuesFromArrayLastElement = myArray;
    }
    // console.log(valuesFromArray);
    // console.log(valuesFromArrayLastValue);

    // calculation of results
    // console.log("-----------result calculation --------------");
    valueForCalculation = valuesFromArray.join("");
    // console.log(valueForCalculation);

    if (
      valueForCalculation.substring(0, 1) === "/" ||
      valueForCalculation.substring(0, 1) === "*" ||
      valueForCalculation.substring(0, 1) === "-" ||
      valueForCalculation.substring(0, 1) === "+"
    ) {
      // console.log("complete value ", valueForCalculation);
      // console.log("length is ", valueForCalculation.length);
      // console.log("operator", valueForCalculation.substring(0, 1));
      // console.log(
      //   "remaining value",
      //   valueForCalculation.substring(1, valueForCalculation.length)
      // );
      mathOperator = valueForCalculation.substring(0, 1);
      secondValue = valueForCalculation.substring(
        1,
        valueForCalculation.length
      );
      // console.log(` operator is ${mathOperator} and ${secondValue}`);
      result = calcResult(mathOperator, secondValue);
    } else {
      // console.log(valueForCalculation);
      result = Number(valueForCalculation);
    }

    // last element calculation

    valueForCalculationLastValue = valuesFromArrayLastElement.join("");

    if (
      valueForCalculationLastValue.substring(0, 1) === "/" ||
      valueForCalculationLastValue.substring(0, 1) === "*" ||
      valueForCalculationLastValue.substring(0, 1) === "-" ||
      valueForCalculationLastValue.substring(0, 1) === "+"
    ) {
      mathOperatorLastElement = valueForCalculationLastValue.substring(0, 1);
      lastValue = valueForCalculationLastValue.substring(
        1,
        valueForCalculationLastValue.length
      );

      result = calcResult(mathOperatorLastElement, lastValue);
    }
    // console.log("The final resule is : ", result);
    displayResult.textContent = result.toFixed(2);
  }

  function calcResult(mathOperator, value) {
    switch (mathOperator) {
      case "+":
        return result + Number(value);
        break;
      case "-":
        return result - Number(value);
        break;
      case "*":
        return result * Number(value);
        break;
      case "/":
        return result / Number(value);
        break;
      // default:
      //   inputResult.value = "";
    }
  }
}
