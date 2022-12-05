let displayValue = [];
let displayTemp = [];
let displayCalc = "";
const buttons = document.querySelectorAll(".numbers");
const lButtons = document.querySelectorAll(".largerButtons");
const displayPort = document.querySelector(".CalcDisplay");

function add(a,b) {
    return (parseInt(a) + parseInt(b)).toString();
}

function subtract(a,b) {
    return (a - b).toString();
}

function multiply(a,b) {
    return (a * b).toString();
}

function divide(a,b) {
    return (a / b).toString();
}

buttons.forEach(element => {
    element.addEventListener("click", function() {
    if (element.id === "=") {
            displayValue.push(displayCalc);
            evaluate();
            displayTemp = displayValue;
            update();
            console.log(displayValue);
            displayTemp = [];
            displayCalc = "";
            displayValue = [];
    } else {
        if(element.id === "+") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            console.log(displayValue);
            update();
            displayCalc = "";
        } else if(element.id === "-") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            console.log(displayValue);
            update();
            displayCalc = "";
        } else if(element.id === "*") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            console.log(displayValue);
            update();
            displayCalc = "";
        } else if (element.id === "/") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            console.log(displayValue);
            update();
            displayCalc = "";
        } else {
            displayCalc += element.id;
            displayTemp.push(element.id);
            update();
        }
        }
    });
});

lButtons.forEach(element => {
    element.addEventListener("click", function() {
        if(element.id === "C") {
            //clear
            displayPort.innerHTML = "0";
            displayCalc = "";
            displayTemp = [];
            displayValue = [];
        } else {
            //delete
            displayCalc = (displayCalc.slice(0, displayCalc.length - 1));
            console.log(displayCalc);
            displayTemp.splice(displayTemp.length-1);
            update();
        }
    });
});

function update() {
    if(displayTemp.length < 1) {
        displayPort.innerHTML = "0";
        displayTemp = [];
    } else {
        displayPort.innerHTML = displayTemp.join("");
    }
}

function evaluate() {
    for(let i = 0; i < displayValue.length; i++) {
        if(displayValue[i] === "*" || displayValue[i] === "/") {
            if(displayValue[i] === "*") {
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = multiply(a,b);
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            } else {
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = divide(a,b);
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            }
        } else if (displayValue[i] === "+" || displayValue[i] === "-"){
            if(displayValue[i] === "+") {
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = add(a,b);
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            } else {
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = subtract(a,b);
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            }
        }
    }
}

//need to add previous answer to the top 
//make sure decimals do not overflow
//disable . button if one is already in displayCalc
//add keybaord functionality