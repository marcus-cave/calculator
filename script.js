let numberA = "";
let numberB = "";
let operator = "";
let result
let operatorSet = false;

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

    console.log("**************")
    console.log(`numberA: ${numberA}`);
    console.log(`Operator: ${operator}`);
    console.log(`numberB: ${numberB}`);
    console.log("**************")

    a = parseFloat(a);
    b = parseFloat(b);

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

    display.textContent = result;

    operatorSet = false;


    return result;
};

const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

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
            if (!numberA && !result) {
                console.log("NO numA or RESULT")
                break;
            }

            if (!numberA) {
                console.log("TEST")
                numberA = result;
                operator = value;
                console.log(`Operator: ${operator}`);
                operatorSet = true;
                display.textContent = "";

                break;
            }

            if (!operatorSet) {
                operator = value;
                console.log(`Operator: ${operator}`);
                operatorSet = true;
                //display.textContent += value;
                break;
            };

            operate(numberA, operator, numberB);
            operator = value;
            operatorSet = true;
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
    }
};

function clearScreen() {
    numberA = "";
    numberB = "";
    operator = "";
    result = null;
    display.textContent = "";

}