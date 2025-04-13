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
    if (value.length > 12) value = value.slice(0, 12);
    displayValue = value === "" ? "0" : value;
    display.textContent = displayValue;
}

function addActiveEffect(button) {
    if (!button) return;
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 150);
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
        addActiveEffect(button);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperator !== null && secondOperand !== "") {
            let result = operate(currentOperator, firstOperand, secondOperand);
            updateDisplay(result);
            firstOperand = result;
            secondOperand = "";
        }
        currentOperator = button.textContent;
        shouldResetScreen = true;
        addActiveEffect(button);
    });
});

equalButton.addEventListener("click", () => {
    if (currentOperator !== null && secondOperand !== "") {
        let result = operate(currentOperator, firstOperand, secondOperand);
        updateDisplay(result);
        firstOperand = result;
        secondOperand = "";
        currentOperator = null;
        shouldResetScreen = true;
    }
    addActiveEffect(equalButton);
});

clearButton.addEventListener("click", () => {
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetScreen = false;
    updateDisplay("0");
    addActiveEffect(clearButton);
});

backspaceButton.addEventListener("click", () => {
    if (currentOperator === null) {
        firstOperand = firstOperand.slice(0, -1);
        updateDisplay(firstOperand);
    } else {
        secondOperand = secondOperand.slice(0, -1);
        updateDisplay(secondOperand);
    }
    addActiveEffect(backspaceButton);
});

function operate(operator, a, b) {
    const n1 = Number(a);
    const n2 = Number(b);

    if (operator === "÷" && n2 === 0) return "Nope, sorry!";

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
        case "÷":
            result = n1 / n2;
            break;
        default:
            return null;
    }
    return result.toString();
}

// Keyboard support and button animation
document.addEventListener("keydown", (event) => {
    event.preventDefault(); //solves a bug with the numeric keypad opening quick search
    const key = event.key;
    let button = null;

    if (!isNaN(key) || key === ".") {
        button = Array.from(numberButtons).find(btn => btn.textContent === key);
        if (button) button.click();
    }

    let operatorKey = key === "/" ? "÷" : key; //solves the issue of using "/" instead of "÷" in a numeric keypad
    if (["+", "-", "*", "÷"].includes(operatorKey)) {
        button = Array.from(operatorButtons).find(btn => btn.textContent === operatorKey);
        if (button) button.click();
    }

    if (key === "Enter" || key === "=") {
        equalButton.click();
        button = equalButton;
    }

    if (key === "Backspace") {
        backspaceButton.click();
        button = backspaceButton;
    }

    if (key === "Escape" || key.toLowerCase() === "c") {
        clearButton.click();
        button = clearButton;
    }

    if (button) {
        button.classList.add("active");
        setTimeout(() => button.classList.remove("active"), 150);
    }
});
