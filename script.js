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

    console.log(`${a} ${operator} ${b} = ${result}`)

    updateActiveOperator("clear")
    display.textContent = result;

    operatorSet = false;



    return result;
};

const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const addBtn = document.querySelector("button[value='+']");

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
    }
};

function clearScreen() {
    numberA = "";
    numberB = "";
    operator = "";
    result = null;
    display.textContent = "";

};

function deleteLast() {
    if (!operatorSet) {
        display.textContent = "";
        numberA = numberA.slice(0, -1);
        display.textContent = numberA;
    } else {
        display.textContent = "";
        numberB = numberB.slice(0, -1);
        display.textContent = numberB;
    }
};

function updateActiveOperator(op) {
    if (op === "clear") { clearOperatorActive(); return; };

    operator = op;
    operatorSet = true;
    console.log(`Operator: ${operator}`);
    display.textContent = "";

}

function clearOperatorActive() {
    addBtn.classList.remove(".active");

}