function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b == 0) return "Cannot Divide by Zero :P";
    else return a / b;
    // if (a % b == 0) return a / b;
    // else {
    //     let decimal = 0;
    //     return Number.parseFloat(a/b).toFixed(decimal);
    // }
}

function operate (a, b, c) {
    switch (c) {
        case "+":
            return add(Number(a), Number(b));
            break;
        case "-":
            return subtract(Number(a), Number(b));
            break;
        case "X":
            return multiply(Number(a), Number(b));
            break;
        case "/":
            return divide(Number(a), Number(b));
            break;
    }
}

let valueA = "N"; //previous value
let valueB = "N"; //current value
let operator = "";
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
                display.textContent = 0;
                valueA = "N";
                valueB = "N";
                operator = "";
                break;
            case "Back":
                if (!equals) {
                    if (display.textContent.length == 1) display.textContent = 0;
                    else display.textContent = display.textContent.slice(0, display.textContent.length-1);
                    if (operator == "") valueA = display.textContent;
                    else valueB = display.textContent;
                }
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
        // console.log("Display Length: "+display.textContent.length);
        console.log(display.textContent);
        // if (display.textContent.length > 10) {
            // if (display.textContent.includes(".")) {
            //     if (display.textContent.length > 11) {
            //         display.textContent = display.textContent.slice(0, 11);
            //     }
                // Remove trailing zeros
            //     if (display.textContent != 0) {
            //         let len = display.textContent.length-1;
            //         for (let i = len; i > 0 && display.textContent[len] == 0; i++) {
            //             display.textContent = display.textContent.slice(0, len);
            //             len--;
            //         }
            //     }
            // }
            // else display.textContent = display.textContent.slice(0, 10);
        // }
    })
})