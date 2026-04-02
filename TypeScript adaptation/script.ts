const display = document.getElementById("inputOutputField") as HTMLInputElement;

const numberButtons = document.querySelectorAll(".buttons") as NodeListOf<HTMLButtonElement>;

const btnAddition = document.getElementById("addition") as HTMLButtonElement;
const btnMultiply = document.getElementById("multiply") as HTMLButtonElement;
const btnDivide = document.getElementById("divide") as HTMLButtonElement;
const btnSubstraction = document.getElementById("substraction") as HTMLButtonElement;
const btnEquals = document.getElementById("equals") as HTMLButtonElement;
const btnDelete = document.getElementById("delete") as HTMLButtonElement;

let firstNum: number | null = null;
let currentOperator: string | null = null;
let WaitingForSecondNum: boolean = false;

function calculate(n1: number, n2: number, op: string): number {
    console.log(`Menghitung: ${typeof n1} ${n1} ${op} ${typeof n2} ${n2}`);
    if(op === "+") return n1 + n2;
    if(op === "-") return n1 - n2;
    if(op === "*") return n1 * n2;
    if(op === "/") return n1 / n2;
    return n2;
}

function inputDigit(digit: string){
    if (WaitingForSecondNum) {
        display.value = digit;
        WaitingForSecondNum = false;
    } else {
        display.value = display.value === "0" ? digit : display.value + digit;
    }
}

function handleOperator(nextOperator: string){
    const inputValue = parseFloat(display.value) || 0;

    if (firstNum === null) {
        firstNum = inputValue;
    } else if (currentOperator) {
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
    if (currentOperator === null || firstNum === null) return;

    const secondNum = parseFloat(display.value);
    const result = calculate(firstNum, secondNum, currentOperator);

    display.value = String(result);

    firstNum = null;
    currentOperator = null;
    WaitingForSecondNum = false;
})

btnAddition.addEventListener('click', () => handleOperator("+"));
btnSubstraction.addEventListener('click', () => handleOperator("-"));
btnMultiply.addEventListener('click', () => handleOperator("*"));
btnDivide.addEventListener('click', () => handleOperator("/"));