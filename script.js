let displayValue = [];
const buttons = document.querySelectorAll(".numbers");
const lButtons = document.querySelectorAll(".largerButtons");
const displayPort = document.querySelector(".CalcDisplay");

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator, a,b) {
    if(operator == "+") {
        return add(a,b);
    } else if(operator === "-") {
        return subtract(a,b);
    } else if(operator === "*") {
        return multiply(a,b);
    } else {
        return divide(a,b);
    }
}

buttons.forEach(element => {
    element.addEventListener("click", function() {
        if(element.id === "C") {
            update();
        } else if(element.id === "D") {
            update();
        } else if (element.id ==="=") {
            update();
        } else {
            displayValue.push(element.id);
            update();
        }
    });
});

lButtons.forEach(element => {
    element.addEventListener("click", function() {
        if(element.id === "C") {
            //clear
            displayPort.innerHTML = "0";
            displayValue = [];
        } else if(element.id === "D") {
            //delete
            displayValue.splice(displayValue.length-1)
            update();
        } else {
            //equals
            evaluate();
            update();
        }
    });
});

function update() {
    if(displayValue.length < 1) {
        displayPort.innerHTML = "0";
        displayValue = [];
    } else {
        displayPort.innerHTML = displayValue.join("");
    }
}

function evaluate() {
    
}