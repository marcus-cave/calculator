let numberA = "";
let numberB = "";
let operator = "";
let result
let operatorSet = false;
let decimalA = false;
let decimalB = false;

//Operation Functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(a, operator, b) {

    a = parseFloat(a);
    b = parseFloat(b);

    if (isNaN(a) || isNaN(b)) {
        clearScreen();
        display.textContent = "ERROR";
        return;
    };

    if (operator === "/" || b === 0) {
        clearScreen();
        display.textContent = "ERROR - !DIV 0";
        return;
    };

    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
    };

    numberA = "";
    numberB = "";

    console.log(`${a} ${operator} ${b} = ${result}`)
    displayEq.textContent = `${a} ${operator} ${b}`;


    clearOperatorActive();
    display.textContent = result;
    operatorSet = false;

    return result;
};

const display = document.querySelector("#display");
const displayEq = document.querySelector("#displayEq");

const buttons = document.querySelectorAll("button");

const addBtn = document.querySelector("button[value='+']");
const subtractBtn = document.querySelector("button[value='-']");
const multiplyBtn = document.querySelector("button[value='*']");
const divideBtn = document.querySelector("button[value='/']");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleButtonPress(button.id, button.value)
    })
})

function handleButtonPress(type, value) {
    switch (type) {
        case "number":
            if (!operatorSet) {
                display.textContent = "";
                numberA += value;
                display.textContent = numberA;
            } else {
                display.textContent = "";
                numberB += value;
                display.textContent = numberB;
            }
            break;
        case "operator":
            if (!numberA && !result) { break; }

            if (!numberA) {
                console.log("TEST")
                numberA = result;

                updateActiveOperator(value);

                break;
            }

            if (!operatorSet) {

                updateActiveOperator(value);
                //display.textContent += value;
                break;
            };

            operate(numberA, operator, numberB);

            updateActiveOperator(value);
            numberA = result;

            break;
        case "equal":

            if (!numberA) break;
            if (!numberB) break;

            operate(numberA, operator, numberB);
            break;
        case "clear":
            clearScreen();
            break;
        case "delete":
            deleteLast();
            break;
        case "decimal":
            if (!operatorSet) {
                if (decimalA) { break };
                display.textContent = "";
                numberA += ".";
                display.textContent = numberA;
                decimalA = true
            } else {
                if (decimalB) { break };
                display.textContent = "";
                numberB += ".";
                display.textContent = numberB;
                decimalB = true;
            }
            break;
    }
};

function clearScreen() {
    numberA = "";
    numberB = "";
    operator = "";
    result = null;
    decimalA = false;
    decimalB = false;
    display.textContent = "";
    clearOperatorActive();

};

function deleteLast() {
    if (!operatorSet) {
        display.textContent = "";
        if ((numberA.charAt(numberA.length - 1)) === ".") { decimalA = false };
        numberA = numberA.slice(0, -1);
        display.textContent = numberA;
    } else {
        display.textContent = "";
        if ((numberB.charAt(numberB.length - 1)) === ".") { decimalB = false };
        numberB = numberB.slice(0, -1);
        display.textContent = numberB;
    }
};

function updateActiveOperator(op) {

    operator = op;
    operatorSet = true;
    console.log(`Operator: ${operator}`);
    display.textContent = "";

    switch (operator) {
        case "+":
            addBtn.classList.add("active");
            break;
        case "-":
            subtractBtn.classList.add("active");
            break;
        case "*":
            multiplyBtn.classList.add("active");
            break;
        case "/":
            divideBtn.classList.add("active");
            break;
    };

}

function clearOperatorActive() {
    addBtn.classList.remove("active");
    subtractBtn.classList.remove("active")
    multiplyBtn.classList.remove("active")
    divideBtn.classList.remove("active")

}