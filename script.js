let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

//WHEN PUSHING A NUMBER:
    //if currentOperator !== null
        //add number ti secondOperand
        //put secondOperand on display
    //else
        //if shouldResetScreen == true
            //reset display
            //shouldResetScreen = false
        //else
            //add num to firstOperand
            //put firstOperand on display

//WHEN PUSHING AN OPERATOR:
    //if there is already an operator and secondOperand !== ""
        //result = operate(currentOperator, firstOperand, secondOperand)
        //show result ond display
        //save result as firstOperand
        //secondOperand = ""
    //else 
        //save pushed operator as currentOperator
        //shouldResetScreen = true

//WHEN PUSHING "=":
    //if currentOperator and secondOperand are defined:
        //result = operate(currentOperator, firstOperand, secondOperand)
        //show result on display
        //save result as firstOperand
        //secondOperand = ""
        //currentOperator = null
        //shouldResetScreen = true

//WHEN PUSHING CLEAR:
    //reset firstOperand, secondOperand, currentOperator
    //reset display

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
