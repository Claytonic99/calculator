function add (a, b) {
    return (a + b).toString();
}

function subtract (a, b) {
    return (a - b).toString();
}

function multiply (a, b) {
    return (a * b).toString();
}

function divide (a, b) {
    if (b == 0) return "Cannot Divide by Zero :P";
    else return (a / b).toString();
    // if (a % b == 0) return a / b;
    // else {
    //     let decimal = 0;
    //     return Number.parseFloat(a/b).toFixed(decimal);
    // }
}

function operate (a, b, c) {
    switch (c) {
        case "+":
            return add(parseFloat(a), parseFloat(b));
            break;
        case "-":
            return subtract(parseFloat(a), parseFloat(b));
            break;
        case "X":
        case "*":
            return multiply(parseFloat(a), parseFloat(b));
            break;
        case "/":
            return divide(parseFloat(a), parseFloat(b));
            break;
    }
}

function backspace() {
    if (!equals) {
        if (display.textContent.length == 1) display.textContent = 0;
        else display.textContent = display.textContent.slice(0, display.textContent.length-1);
        if (operator == "") valueA = display.textContent;
        else valueB = display.textContent;
    }
}

function clear() {
    display.textContent = 0;
    valueA = "N";
    valueB = "N";
    operator = "";
}

let valueA = "N"; //previous value
let valueB = "N"; //current value
let operator = "";
let precision = 0;
let equals = true; //set to true whenpressing the equals button and false when pressing any other operator

const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.textContent);
        operators.forEach((op) => {
            op.style.backgroundColor = "white";
        })
        switch (button.textContent) {
            case "Clear":
                clear();
            break;

            case "Back":
                backspace();
            break;
            
            case "+":
            case "-":
            case "X":
            case "/":
                if (valueA == "N") valueA = 0; //if pressing an operator before any numbers, accept A is zero
                if (valueB != "N" && !equals) { //only operate if B is assigned and previous operator was not equals
                    if (operator == "") operator = button.textContent;
                    console.log(`${valueA} ${operator} ${valueB}`);
                    display.textContent = operate(valueA, valueB, operator);
                }
                button.style.backgroundColor = "green";
                valueA = display.textContent;
                equals = false;
                operator = button.textContent;
                valueB = 0;
            break;
            
            case "=":
                if (operator != "") { //requires some operator to have been pressed previously
                    console.log(operator);
                    display.textContent = operate(valueA, valueB, operator);
                    // button.style.backgroundColor = "green";
                    valueA = display.textContent;
                    equals = true;
                }
            break;
            
            case ".":
                if (!display.textContent.includes(".")) {
                     if (equals){ //if last button was equals, start fresh
                        valueA = "N";
                        valueB = "N";
                        operator = "";
                    }
                    if (valueB == "N") { //if B is not assigned yet, start with A
                        if (valueA == "N" || valueA === 0) valueA = button.textContent;
                        else if (valueA.length < 20) valueA += button.textContent;
                        display.textContent = valueA;
                    }
                    else {
                        if (valueB == "N" || valueB === 0) valueB = button.textContent;
                        else if (valueB.length < 20) valueB += button.textContent;
                        display.textContent = valueB;
                    }
                    equals = false;
                }
            break;
            
            default: //numbers
                if (equals){ //if last button was equals, start fresh
                    valueA = "N";
                    valueB = "N";
                    operator = "";
                }
                if (valueB == "N") { //if B is not assigned yet, start with A
                    if (valueA == "N" || valueA === 0) valueA = button.textContent;
                    else if (valueA.length < 20) valueA += button.textContent;
                    display.textContent = valueA;
                }
                else {
                    if (valueB == "N" || valueB === 0) valueB = button.textContent;
                    else if (valueB.length < 20) valueB += button.textContent;
                    display.textContent = valueB;
                }
                equals = false;
            break;
        } //end switch button text content
        console.log(display.textContent);
    }) //end click listener
}) //end for each button


/////////////////////
// Keyboard Inputs //
/////////////////////
document.addEventListener("keydown", (input) => {
    const key = input.key;
    if (key !== undefined) console.log(key);
    switch (key) {
        case "Escape":
            clear();
        break;

        case "Backspace":
            backspace();
        break;

        case "+":
        case "-":
        case "*":
        case "/":
            if (valueA == "N") valueA = 0; //if pressing an operator before any numbers, accept A is zero
            if (valueB != "N" && !equals) { //only operate if B is assigned and previous operator was not equals
                if (operator == "") operator = key;
                console.log(`${valueA} ${operator} ${valueB}`);
                display.textContent = operate(valueA, valueB, operator);
            }
            valueA = display.textContent;
            equals = false;
            operator = key;
            valueB = 0;
        break;
        
        case "Enter":
        case "=":
            if (operator != "") { //requires some operator to have been pressed previously
                console.log(operator);
                display.textContent = operate(valueA, valueB, operator);
                valueA = display.textContent;
                equals = true;
            }
        break;

        case ".":
            if (!display.textContent.includes(".")) {
                    if (equals){ //if last button was equals, start fresh
                    valueA = "N";
                    valueB = "N";
                    operator = "";
                }
                if (valueB == "N") { //if B is not assigned yet, start with A
                    if (valueA == "N" || valueA === 0) valueA = key;
                    else if (valueA.length < 20) valueA += key;
                    display.textContent = valueA;
                }
                else {
                    if (valueB == "N" || valueB === 0) valueB = key;
                    else if (valueB.length < 20) valueB += key;
                    display.textContent = valueB;
                }
                equals = false;
            }
        break;

        default: //numbers
            if (Number.isFinite(Number(key))) {
                if (equals){ //if last button was equals, start fresh
                    valueA = "N";
                    valueB = "N";
                    operator = "";
                }
                if (valueB == "N") { //if B is not assigned yet, start with A
                    if (valueA == "N" || valueA === 0) valueA = String(key);
                    else if (valueA.length < 20) valueA += String(key);
                    display.textContent = valueA;
                }
                else {
                    if (valueB == "N" || valueB === 0) valueB = String(key);
                    else if (valueB.length < 20) valueB += String(key);
                    display.textContent = valueB;
                }
                equals = false;
            }
        break;
    } //end switch key
}) //end keypress listener