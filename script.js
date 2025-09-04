function add (a, b) {
    return (a + b).toFixed(valueA.length);
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
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
            if (b == 0) return "Div by Zero";
            else return divide(Number(a), Number(b));
            break;
    }
}

let valueA = "N"; //previous value
let valueB = "N"; //current value
let operator = "";
let equals = false; //set to true whenpressing the equals button and false when pressing any other operator

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
                break;
            case "Back":
                if (display.textContent.length == 1) display.textContent = 0;
                else display.textContent = display.textContent.slice(0, display.textContent.length-1);
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
                display.textContent = operate(valueA, valueB, operator);
                // button.style.backgroundColor = "green";
                valueA = display.textContent;
                equals = true;
                break;
            default:
                if (equals){
                    valueA = "N";
                    valueB = "N";
                }
                if (valueB == "N") { //if B is not assigned yet, start with A
                    if (valueA == "N" || valueA === 0) valueA = button.textContent;
                    else valueA += button.textContent;
                    display.textContent = valueA;
                }
                else {
                    if (valueB == "N" || valueB === 0) valueB = button.textContent;
                    else valueB += button.textContent;
                    display.textContent = valueB;
                }
                equals = false;
            break;
        } //end switch button text content
        console.log("Display Length: "+display.textContent.length);
        if (display.textContent.length > 10) {
            if (display.textContent.includes(".")) {
                if (display.textContent.length > 11) {
                    display.textContent = display.textContent.slice(0, 11);
                }
            }
            else display.textContent = display.textContent.slice(0, 10);
        }
    })
})