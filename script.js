//what is calculated from
let displayValue = [];
//what is shown
let displayTemp = [];
//my way of combined numbers if into one element seperated by operators.
let displayCalc = "";
const buttons = document.querySelectorAll(".numbers");
const lButtons = document.querySelectorAll(".largerButtons");
const displayPort = document.querySelector(".CalcDisplay");
const prevAnswer = document.querySelector(".prevAnswer");
const dotButton = document.getElementById(".");
let usedDot = false;


function add(a,b) {
    //parseInt to make it an integer from a string so you can add correctly
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
            usedDot = false;
            update();
            //reset all values
            displayTemp = [];
            displayCalc = "";
            displayValue = [];
    } else {
        if(element.id === "+") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            update();
            displayCalc = "";
            usedDot = false;
        } else if(element.id === "-") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            update();
            usedDot = false;
            displayCalc = "";
        } else if(element.id === "*") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            update();
            displayCalc = "";
            usedDot = false;
        } else if (element.id === "/") {
            displayValue.push(displayCalc, element.id);
            displayTemp.push(element.id);
            update();
            displayCalc = "";
            usedDot = false;
        } else {
            if(element.id === ".") {
                usedDot = true;
            }
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
            prevAnswer.innerHTML = "";
        } else {
            //delete
            displayCalc = (displayCalc.slice(0, displayCalc.length - 1));
            displayTemp.splice(displayTemp.length-1);
            update();
        }
    });
});

function update() {
    //so you cant use multiple decimals in one number
    if(usedDot) {
        dotButton.disabled = true;
        dotButton.style.color = "red";
    } else {
        dotButton.disabled = false;
        dotButton.style.color = "white";
    }
    displayPort.innerHTML = displayTemp.join("");
}

function evaluate() {
    //Show Previous answer in the top right
    prevAnswer.innerHTML = displayTemp.join("") + " = ";
    for(let i = 0; i < displayValue.length; i++) {
        //PEMDAS
        if(displayValue[i] === "*" || displayValue[i] === "/") {
            if(displayValue[i] === "*") {
                //first calculate the value of the elements to the left and right of the operator
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = round(multiply(a,b), 3);
                //set the operator to the answer and splice out the two numbers to the left and right
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            } else {
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = round(divide(a,b), 3);
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            }
        } else if (displayValue[i] === "+" || displayValue[i] === "-"){
            if(displayValue[i] === "+") {
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = round(add(a,b), 3);
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            } else {
                let a = displayValue[i-1];
                let b = displayValue[i + 1];
                displayValue[i] = round(subtract(a,b), 3);
                displayValue.splice(i+1,1);             
                displayValue.splice(i-1,1);
                evaluate();
            }
        } 
    }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

document.addEventListener('keydown', (event) => {
    //Keyboard functionality
    let name = (event.key).toString();
    if (name === "Enter") {
        displayValue.push(displayCalc);
        evaluate();
        displayTemp = displayValue;
        usedDot = false;
        update();
        //reset all values
        displayTemp = [];
        displayCalc = "";
        displayValue = [];
    } else {
        if(name === "Backspace") {
            displayCalc = (displayCalc.slice(0, displayCalc.length - 1));
            displayTemp.splice(displayTemp.length-1);
            update();
        } else if(name === "+") {
            displayValue.push(displayCalc, name);
            displayTemp.push(name);
            update();
            displayCalc = "";
            usedDot = false;
        } else if(name === "-") {
            displayValue.push(displayCalc, name);
            displayTemp.push(name);
            update();
            usedDot = false;
            displayCalc = "";
        } else if(name === "*") {
            displayValue.push(displayCalc, name);
            displayTemp.push(name);
            update();
            displayCalc = "";
            usedDot = false;
        } else if (name === "/") {
            displayValue.push(displayCalc, name);
            displayTemp.push(name);
            update();
            displayCalc = "";
            usedDot = false;
        } else if (!isNaN(parseInt(name))){
            //check to see if it is a number
            if(name === ".") {
                usedDot = true;
            }
            displayCalc += name;
            displayTemp.push(name);
            update();
        }
    }
  }, false);

