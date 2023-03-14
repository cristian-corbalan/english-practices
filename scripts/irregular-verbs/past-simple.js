'use strict'

/* ---------- Vars --------------*/
const contentContainer = document.getElementById('content');
const showButton = document.querySelector('.list-group-item:nth-of-type(1) button')
const startButton = document.querySelector('.list-group-item:nth-of-type(2) button')
// const continueButton = document.querySelector('.list-group-item:nth-of-type(3) button')
const scoreTag = document.querySelector('.score')
const verbLengthTag = document.querySelector('.verbs-length')
const resultTag = document.querySelector('.result-li')
const verbTag = document.querySelector('.verb')
const form = document.querySelector('#verb-form')
const input = document.querySelector('#input-verb')
let gameVerbs = [...verbs]
let score = 0;
let pos;
let verb;

/* ---------- Functions --------------*/

const clearActive = () => {
    showButton.classList.remove('active');
    showButton.classList.remove('disabled');
    startButton.classList.remove('active');
    startButton.classList.remove('disabled');
    // continueButton.classList.remove('active');
    // continueButton.classList.remove('disabled');
}
const showTable = () => {
    // Clear
    contentContainer.innerHTML = '';

    // Create table
    let table = createHtmlTag('table', {class: 'table table-striped'});
    contentContainer.appendChild(table);

    // Create table's header
    let thead = document.createElement("thead");
    table.appendChild(thead);

    let tr = document.createElement("tr");
    thead.appendChild(tr);

    let th = createHtmlTag('th', {class: 'col'}, "Infinitive");
    tr.appendChild(th)

    th = createHtmlTag('th', {class: 'col'}, "Past simple");
    tr.appendChild(th)


    // Create table's body
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (const verb of verbs) {
        tr = document.createElement("tr");
        tbody.appendChild(tr);

        let td = createHtmlTag('td', null, verb.infinitive);

        tr.appendChild(td)

        td = createHtmlTag('td', null, verb.pastSimple);

        tr.appendChild(td)
    }
}

const checkValue = (verb) => {
    let value = input.value;

    score += value === verb.pastSimple ? 20 : -5;

    let c = 'list-group-item ';
    c += value === verb.pastSimple ? 'list-group-item-success' : 'list-group-item-danger';

    let t = value === verb.pastSimple ? 'Correcto, ' : 'Incorrecto ';
    t += `El pasado simple de <span class="fw-bold">${verb.infinitive}</span> es <span class="fw-bold">${verb.pastSimple}</span>`

    resultTag.className = c;
    resultTag.innerHTML = t;

    return value === verb.pastSimple;
}

const endGame = () => {
    let mBody = document.querySelector('.modal-body')

    mBody.innerHTML = '';

    let p = createHtmlTag('p', {class: 'h2 text-center mb-4'}, 'You finished');
    mBody.appendChild(p);

    p = createHtmlTag('p', {class: 'h4 text-center mb-4'}, `Your score is <span class="fw-bold">${score}</span>`);
    mBody.appendChild(p);

    p = createHtmlTag('p', {class: 'text-center mb-4'}, `Recarga la página para volver a jugar :D`);
    mBody.appendChild(p);

    // let buttonRestart = startButton.cloneNode();
    // buttonRestart.className = 'btn btn-success d-block m-auto mb-4'
    // buttonRestart.innerText = 'Volver a jugar';
    // mBody.appendChild(buttonRestart);


}

const printInfo = (verb) => {
    verbLengthTag.innerText = gameVerbs.length;
    scoreTag.innerText = score;
    verbTag.innerText = verb.infinitive;
}

const startGame = () => {

    // Reset array
    gameVerbs = [...verbs]
    score = 0;

    contentContainer.innerHTML = '';

    // Tengo que obtener el verbo a comparar
    pos = getRandomPosition(gameVerbs)
    verb = gameVerbs[pos];

    printInfo(verb, null);
}

/* ---------- Others --------------*/

showButton.addEventListener('click', function (e) {
    clearActive();
    showTable();

    e.target.classList.add('active');
    e.target.classList.add('disabled');
})

startButton.addEventListener('click', function (e) {
    clearActive();
    startGame();

    e.target.classList.add('active');
})

form.addEventListener('submit', (e) => {
    input.focus();
    e.preventDefault();

    if (checkValue(verb)) {
        // Quito una posición
        gameVerbs.splice(pos, 1);
        if (gameVerbs.length === 0) {
            endGame();
            return;
        }
    }

    pos = getRandomPosition(gameVerbs)
    verb = gameVerbs[pos];

    printInfo(verb);

    input.value = '';
})