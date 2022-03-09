const result = document.getElementById('result');

// Options
const length__div = document.getElementById('length');
const uppercase__div = document.getElementById('uppercase');
const lowercase__div = document.getElementById('lowercase');
const number__div = document.getElementById('numbers');
const symbol__div = document.getElementById('symbols');

// Buttons
const generate = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
    upper: getUppercase,
    lower: getLowercase,
    number: getNumber,
    symbol: getSymbol
}

// Event Listeners
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if (!password) { return };

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
})

generate.addEventListener('click', () => {
    const
        length = length__div.value,
        upper = uppercase__div.checked,
        lower = lowercase__div.checked,
        number = number__div.checked,
        symbol = symbol__div.checked

    result.innerText = generatePassword(length, upper, lower, number, symbol);
})

function generatePassword(length, upper, lower, number, symbol) {
    const checkedCount = upper + lower + number + symbol;
    const optionsArray = [{ upper }, { lower }, { number }, { symbol }];
    const checkedArray = optionsArray.filter(item => Object.values(item)[0]);

    if (checkedCount === 0) {
        return '';
    }

    let password = '';
    for (let i = 0; i < length; i += checkedCount) {
        checkedArray.forEach(item => {
            const option = Object.keys(item)[0];
            password += randomFunc[option]();
        })
    }

    const finalPassword = password.slice(0, length);
    return finalPassword;
}

// Functions - Get Random
function getUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65).toUpperCase();
}

function getLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
    const symbols = '!@#$%^&*()={}[]<>?';
    return symbols[Math.floor(Math.random() * symbols.length)];
}