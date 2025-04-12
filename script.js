let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;
let displayValue = "0";

const numberButtons = document.querySelectorAll(".btn:not(.operator):not(.clear):not(.equal):not(.backspace)");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const backspaceButton = document.querySelector(".backspace");
const display = document.querySelector("#display span");

// Initilize the display with 0
updateDisplay("0");

function updateDisplay(value) {
    // If display is empty, set it to 0
    if (value === "") {
        displayValue = "0";
    } else {
        displayValue = value;
    }
    display.textContent = displayValue;
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "." && (currentOperator === null ? firstOperand : secondOperand).includes(".")) return;

        if (currentOperator !== null) {
            secondOperand += value;
            updateDisplay(secondOperand);
        } else {
            if (shouldResetScreen) {
                firstOperand = "";
                shouldResetScreen = false;
            }
            firstOperand += value;
            updateDisplay(firstOperand);
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperator !== null && secondOperand !== "") {
            let result = operate(currentOperator, firstOperand, secondOperand);
            updateDisplay(result);
            firstOperand = result; // Saves the result as the first operand
            secondOperand = ""; // Clears the second operand
        }
        currentOperator = button.textContent;
        shouldResetScreen = true;
    });
});

equalButton.addEventListener("click", () => {
    if (currentOperator !== null && secondOperand !== "") {
        let result = operate(currentOperator, firstOperand, secondOperand);
        updateDisplay(result);
        firstOperand = result;
        secondOperand = "";
        currentOperator = null; // There is no operator after equal
        shouldResetScreen = true;
    }
});

clearButton.addEventListener("click", () => {
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetScreen = false;
    updateDisplay("0"); 
});

backspaceButton.addEventListener("click", () => {
    if (currentOperator === null) {
        firstOperand = firstOperand.slice(0, -1);
        updateDisplay(firstOperand);
    } else {
        secondOperand = secondOperand.slice(0, -1);
        updateDisplay(secondOperand);
    }
});

function operate(operator, a, b) {
    const n1 = Number(a);
    const n2 = Number(b);

    // Check the division by zero
    if (operator === "/" && n2 === 0) {
        return "ERR"; // Return "ERR" if division by zero
    }

    let result;
    switch (operator) {
        case "+":
            result = n1 + n2;
            break;
        case "-":
            result = n1 - n2;
            break;
        case "*":
            result = n1 * n2;
            break;
        case "/":
            result = n1 / n2;  // Only if n2 is not zero
            break;
        case "%":
            result = n1 % n2;
            break;
        default:
            return null;
    }

    // If result is NaN (e.g., if a or b is not a number), return "ERR"
    if (Number.isNaN(result)) {
        return "ERR"; 
    }

    // Return result as an integer if no decimals, else round to 2 decimals
    return Number.isInteger(result) ? result : parseFloat(result.toFixed(2));
}

