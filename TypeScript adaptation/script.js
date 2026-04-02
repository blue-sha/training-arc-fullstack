const display = document.getElementById("inputOutputField");
const numberButtons = document.querySelectorAll(".buttons");
const btnAddition = document.getElementById("addition");
const btnMultiply = document.getElementById("multiply");
const btnDivide = document.getElementById("divide");
const btnSubstraction = document.getElementById("substraction");
const btnEquals = document.getElementById("equals");
const btnDelete = document.getElementById("delete");
let firstNum = null;
let currentOperator = null;
let WaitingForSecondNum = false;
function calculate(n1, n2, op) {
    console.log(`Menghitung: ${typeof n1} ${n1} ${op} ${typeof n2} ${n2}`);
    if (op === "+")
        return n1 + n2;
    if (op === "-")
        return n1 - n2;
    if (op === "*")
        return n1 * n2;
    if (op === "/")
        return n1 / n2;
    return n2;
}
function inputDigit(digit) {
    if (WaitingForSecondNum) {
        display.value = digit;
        WaitingForSecondNum = false;
    }
    else {
        display.value = display.value === "0" ? digit : display.value + digit;
    }
}
function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value) || 0;
    if (firstNum === null) {
        firstNum = inputValue;
    }
    else if (currentOperator) {
        const result = calculate(firstNum, inputValue, currentOperator);
        display.value = String(result);
        firstNum = result;
    }
    WaitingForSecondNum = true;
    currentOperator = nextOperator;
}
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const digit = button.value;
        if (digit !== "") {
            inputDigit(digit);
        }
    });
});
btnEquals.addEventListener('click', () => {
    if (currentOperator === null || firstNum === null)
        return;
    const secondNum = parseFloat(display.value);
    const result = calculate(firstNum, secondNum, currentOperator);
    display.value = String(result);
    firstNum = null;
    currentOperator = null;
    WaitingForSecondNum = false;
});
btnAddition.addEventListener('click', () => handleOperator("+"));
btnSubstraction.addEventListener('click', () => handleOperator("-"));
btnMultiply.addEventListener('click', () => handleOperator("*"));
btnDivide.addEventListener('click', () => handleOperator("/"));
export {};
//# sourceMappingURL=script.js.map