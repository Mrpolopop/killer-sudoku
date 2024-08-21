const btn = document.getElementById('submit');

btn.addEventListener('click', formulaire);
//fonctions
function formulaire() {
    const target = document.getElementById('target_input').value;
    const cases = document.getElementById('cases_input').value;
    const resultat = document.getElementById('resultat');

    const listExclus = nbExclus();
    const solutions = combinaisons(target, cases, listExclus);
    let text = '';

    if (solutions.length == 0) {
        text = "aucune combinaison de correspond";

    } else {
        for(let element of solutions) {
            text += '[' + element + ']  ';
        }
    }
    
    resultat.textContent = text;
}

function nbExclus() {
    let listExclus = [];

    for (let i = 1; i < 10; i++) {
        const checkbox = document.getElementById(i);

        if (checkbox.checked) {
            listExclus.push(i)
        }
    }

    return listExclus;
}

function bruteForce(espace, target, id = 0, solution = null) {
    if (solution === null) {
        solution = [];
    }

    if (id === espace.length) {
        let somme = 0;

        for (let element of espace) {
            somme += element;
        }

        if (somme == target) {
            solution.push([...espace]);
        }

        return solution;

    } else {

        for (let i = 1; i < 10; i++) {
            espace[id] = i;
            let reponse = bruteForce(espace, target, id + 1, solution);
            solution = reponse;
        }

        return solution;
    }
}

function combinaisons(target, cases, listExclus) {
    let espace = [];

    for (let i = 0; i < cases; i++) {
        espace.push(0);
    }

    let propositions = bruteForce(espace, target);
    let solutions = [];

    for (let element of propositions) {
        element.sort((a, b) => a - b);
        let doublon = false;
        let exclus = false;

        for (let nombre of listExclus) {
            if (element.includes(nombre)) {
                exclus = true;
            }
        }

        for (let i = 1; i < element.length; i++) {
            if (element[i - 1] === element[i]) {
                doublon = true;
            }
        }

        if (!exclus && !doublon && !solutions.some(sol => JSON.stringify(sol) === JSON.stringify(element))) {
            solutions.push(element);
        }
    }
    return solutions;
}