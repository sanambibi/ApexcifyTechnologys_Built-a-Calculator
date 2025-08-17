let input = document.getElementById('inputBox');
let historyDiv = document.getElementById('history');
let currentString = "";

function update() {
  input.value = currentString;
  try {
    historyDiv.textContent = currentString 
      ? "= " + eval(currentString.replace(/%/g, "/100")) 
      : "";
  } catch {
    historyDiv.textContent = "";
  }
}

function append(value) {
  currentString += value;
  update();
}

function calculate() {
  try {
    currentString = String(eval(currentString.replace(/%/g, "/100")));
  } catch {
    currentString = "Error";
  }
  update();
}


function delOne() {
  currentString = currentString.slice(0, -1);
  update();
}

function clearAll() {
  currentString = "";
  update();
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.innerText;
    if (t === '=') calculate();
    else if (t === 'AC') clearAll();
    else if (t === 'DEL') delOne();
    else append(t);
  });
});

document.addEventListener('keydown', (e) => {
  if ("0123456789.+-*/%".includes(e.key)) {
    append(e.key);
  }
  else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  }
  else if (e.key === 'Backspace') {
    e.preventDefault();
    delOne();
  }
  else if (e.key === 'Escape') {
    clearAll();
  }
});

update();
