// Append a character to the display
function write(char) {
    const display = document.getElementById('calc-display');
    display.innerText += char;
}

// Clear display
function clearDisplay() {
    document.getElementById('calc-display').innerText = '';
}

// Corrected read function
function read(message) {
    message += '+'; // sentinel operator at the end
    let n = message.length;
    let chars = [];
    let s = "";

    for (let i = 0; i < n; i++) {
        // Check if the character is a number or decimal point
        if (!isNaN(parseInt(message[i])) || message[i] === '.') {
            s += message[i];
        } else {
            if (s.length === 0) {
                throw new Error("Wrong input.");
            } else {
                chars.push(s);
                chars.push(message[i]);
                s = "";
            }
        }
    }

    // Calculate result
    let m = chars.length;
    let cur = parseFloat(chars[0]);

    for (let i = 1; i < m - 1; i += 2) {
        const operator = chars[i];
        const next = parseFloat(chars[i + 1]);

        if (operator === '+') {
            cur = add(cur, next);
        } else if (operator === '-') {
            cur = subtract(cur, next);
        } else if (operator === '*') {
            cur = multiply(cur, next);
        } else if (operator === '/') {
            cur = divide(cur, next);
        } else {
            throw new Error("Wrong input.");
        }
    }

    return cur;
}

// Basic math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) throw new Error("Division by zero is not allowed.");
    return a / b;
}

// Calculate button
function calculate() {
    const display = document.getElementById('calc-display');
    try {
        const result = read(display.innerText);
        display.innerText = result;
    } catch (err) {
        display.innerText = "Error";
        console.error(err);
    }
}

// Wire buttons dynamically
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    const id = btn.id;

    // Numbers and dot
    if (!isNaN(id) || id === "dot") {
        btn.onclick = () => write(btn.innerText);
    }

    // Clear button
    if (id === "clear") {
        btn.onclick = clearDisplay;
    }

    // Equals button
    if (id === "equals") {
        btn.onclick = calculate;
    }

    // Operators (+, −, ×, ÷)
    if (id === "add" || id === "subtract" || id === "multiply" || id === "divide") {
        btn.onclick = () => {
            let char = '';
            if (id === 'add') char = '+';
            else if (id === 'subtract') char = '-';
            else if (id === 'multiply') char = '*';
            else if (id === 'divide') char = '/';
            write(char);
        };
    }
});
