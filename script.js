function precedence(op) {
    if(op === '+' || op === '-') return 1;
    if(op === '*' || op === '/') return 2;
    if(op === '^') return 3;
    return 0;
}

function infixToPostfix(infix) {
    let stack = [];
    let postfix = '';
    let steps = [];

    for(let i = 0; i < infix.length; i++) {
        let char = infix[i];
        let step = { "char": char, "stack": [...stack], "postfix": postfix };

        if(/[a-zA-Z0-9]/.test(char)) {
            postfix += char;
        }
        else if(char === '(') {
            stack.push(char);
        }
        else if(char === ')') {
            while(stack.length && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
            }
            stack.pop(); // Remove '(' from the stack
        }
        else {
            while(stack.length && precedence(char) <= precedence(stack[stack.length - 1])) {
                postfix += stack.pop();
            }
            stack.push(char);
        }
        
        step.stack = [...stack];
        step.postfix = postfix;
        steps.push(step);
    }

    while(stack.length) {
        postfix += stack.pop();
        steps.push({ "char": '', "stack": [...stack], "postfix": postfix });
    }

    return { postfix, steps };
}

function convert() {
    let infix = document.getElementById('infix').value;
    let result = infixToPostfix(infix);
    document.getElementById('postfix').textContent = result.postfix;
    displaySteps(result.steps);
}

function displaySteps(steps) {
    let table = "<table><tr><th>Step&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>Input Exp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>Stack&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th><th>Postfix&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th></tr>";
    for(let i = 0; i < steps.length; i++) {
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${steps[i].char}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${steps[i].stack.join(' ')}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
                    <td>${steps[i].postfix}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
                  </tr>`;
    }
    table += "</table>";
    document.getElementById('steps-table').innerHTML = table;
}
