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
        display.value = "ERROR";
        return;
    };

    if (operator === "/" && b === 0) {
        clearScreen();
        display.value = "ERROR - !DIV 0";
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
    displayEq.value = `${a} ${operator} ${b}`;


    clearOperatorActive();
    display.value = result;
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
                displayEq.value = "";
                display.value = "";
                numberA += value;
                display.value = numberA;
            } else {
                displayEq.value = "";
                display.value = "";
                numberB += value;
                display.value = numberB;
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
                //display.value += value;
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
                display.value = "";
                numberA += ".";
                display.value = numberA;
                decimalA = true
            } else {
                if (decimalB) { break };
                display.value = "";
                numberB += ".";
                display.value = numberB;
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
    display.value = "";
    displayEq.value = "";

    clearOperatorActive();

};

function deleteLast() {
    if (!operatorSet) {
        display.value = "";
        if ((numberA.charAt(numberA.length - 1)) === ".") { decimalA = false };
        numberA = numberA.slice(0, -1);
        display.value = numberA;
    } else {
        display.value = "";
        if ((numberB.charAt(numberB.length - 1)) === ".") { decimalB = false };
        numberB = numberB.slice(0, -1);
        display.value = numberB;
    }
};

function updateActiveOperator(op) {

    operator = op;
    operatorSet = true;
    console.log(`Operator: ${operator}`);
    

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