let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

let displayValue = "";
const numberButtons = document.querySelectorAll(".btn");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const display = document.querySelector("#display span");

//WHEN PUSHING A NUMBER:
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
    // button.textContent is the number
    //if currentOperator !== null
        if (currentOperator !== null){
            //add number to secondOperand
            secondOperand += button.textContent;
            //put secondOperand on display
            displayValue = secondOperand;
            document.querySelector("#display span").textContent = displayValue;
        }
        else{
            if (shouldResetScreen) {
                displayValue = "";
                shouldResetScreen = false;
                document.querySelector("#display span").textContent = displayValue;
            }
            else{
            //if firstOperand is empty
                //add number to firstOperand
                firstOperand += button.textContent;
                //put firstOperand on display
                displayValue = firstOperand;
                document.querySelector("#display span").textContent = displayValue;

            }

        }

    });
});

//WHEN PUSHING AN OPERATOR:
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        // button.textContent is the operator
        //if currentOperator is null
        if (currentOperator === null){
            //save pushed operator as currentOperator
            currentOperator = button.textContent;
            shouldResetScreen = true;
        }
        //else if secondOperand is not empty
        else if (secondOperand !== ""){
            //result = operate(currentOperator, firstOperand, secondOperand)
            result = operate(currentOperator, firstOperand, secondOperand);
            //show result on display
            displayValue = result;
            document.querySelector("#display span").textContent = displayValue;
            //save result as firstOperand
            firstOperand = result;
            //secondOperand = ""
            secondOperand = "";
            //save pushed operator as currentOperator
            currentOperator = button.textContent;
            shouldResetScreen = true;
        }
        //else if currentOperator !== null
        //if there is already an operator and secondOperand !== ""
        else if (currentOperator !== null && secondOperand === ""){
            //result = operate(currentOperator, firstOperand, secondOperand)
            result = operate(currentOperator, firstOperand, secondOperand);
            //show result on display
            displayValue = result;
            document.querySelector("#display span").textContent = displayValue;
            //save result as firstOperand
            firstOperand = result;
            //secondOperand = ""
            secondOperand = "";
        }
        else{
            //save pushed operator as currentOperator
            currentOperator = button.textContent;
            //shouldResetScreen = true;
            shouldResetScreen = true;
        }
    });
});

//WHEN PUSHING "=":
equalButton.addEventListener("click", () => {
    //if currentOperator and secondOperand are defined:
    if (currentOperator !== null && secondOperand !== "") {
        //result = operate(currentOperator, firstOperand, secondOperand)
        result = operate(currentOperator, firstOperand, secondOperand);
        //show result on display
        displayValue = result;
        document.querySelector("#display span").textContent = displayValue;
        //save result as firstOperand
        firstOperand = result;
        //secondOperand = ""
        secondOperand = "";
        //currentOperator = null
        currentOperator = null;
        //shouldResetScreen = true
        shouldResetScreen = true;
    }
});

//WHEN PUSHING CLEAR:
clearButton.addEventListener("click", () => {
    //reset firstOperand, secondOperand, currentOperator
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    //reset display
    displayValue = "";
    document.querySelector("#display span").textContent = displayValue;
    //reset shouldResetScreen
    shouldResetScreen = false;
}
);

function operate(currentOperator, firstOperand, secondOperand) {
    n1 = Number(firstOperand);
    n2 = Number(secondOperand);
      
    switch (currentOperator) {
        case '+':
            return Math.round(n1 + n2);
        case '-':
            return Math.round(n1 - n2);
        case '*':
            return Math.round(n1 * n2);
        case '/':
            return n2 === 0 ? 'ERR' : Math.round(n1 / n2);
        default:
            return null;
    }
}
