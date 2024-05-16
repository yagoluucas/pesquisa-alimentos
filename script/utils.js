import { alimentosDaPesquisa } from './script.js'
export function setarInfoInicialLocalStorage() {
    const alimento = localStorage.getItem('alimentos')
    if (alimento == null) {
        localStorage.setItem('alimentos', JSON.stringify({ alimentos: [] }))
        return 'informações alocadas'
    }

    return 'informações já alocadas'
}

export function pegarInfoLocalStorage(info) {
    return JSON.parse(localStorage.getItem(info))
}

export function setarInfoLocalStorage(objeto) {
    const arrayAlimentos = pegarInfoLocalStorage('alimentos')
    arrayAlimentos.alimentos.unshift(objeto)
    localStorage.setItem('alimentos', JSON.stringify(arrayAlimentos))
}


export function construirDivAlimento(comida, id) {
    const paragrafoFibra = document.createElement('p')
    const paragrafoCarboidrato = document.createElement('p')
    const paragrafoGordura = document.createElement('p')
    const paragrafoProteina = document.createElement('p')
    const paragrafoCalorias = document.createElement('p')
    let btnAdicionarAlimento = ''
    if (window.location.pathname == '/index.html') {
        btnAdicionarAlimento = document.createElement('button')
        btnAdicionarAlimento.addEventListener('click', () => {
            salvarInfo(btnAdicionarAlimento, alimentosDaPesquisa)
        })
        btnAdicionarAlimento.innerHTML = 'Adicionar Alimento'
    }
    const divInfoAlimnto = document.createElement('div')
    const arrayNutrientes = comida.nutrients
    const divAlimento = document.createElement('div')
    const imgComida = document.createElement('img')
    const h2 = document.createElement('h2')
    divAlimento.classList.add('card-alimento')
    imgComida.src = comida.image == undefined ? './imagens/sem-comida.png' : comida.image
    h2.textContent = comida.label
    paragrafoFibra.innerHTML = `<span class="verde">Fibras </span>: ${arrayNutrientes.FIBTG.toFixed(2)}`
    paragrafoCarboidrato.innerHTML = `<span class="verde">Carboidrato </span>: ${arrayNutrientes.CHOCDF.toFixed(2)}`
    paragrafoGordura.innerHTML = `<span class="verde">Gordura </span>: ${arrayNutrientes.FAT.toFixed(2)}`
    paragrafoProteina.innerHTML = `<span class="verde">Proteina </span>: ${arrayNutrientes.PROCNT.toFixed(2)}`
    paragrafoCalorias.innerHTML = `<span class="verde">Calorias </span>: ${arrayNutrientes.ENERC_KCAL.toFixed(2)}`
    divInfoAlimnto.append(paragrafoFibra, paragrafoCarboidrato, paragrafoGordura, paragrafoProteina, paragrafoCalorias, btnAdicionarAlimento)
    divAlimento.append(h2, imgComida, divInfoAlimnto)
    divAlimento.setAttribute('id', id)
    return divAlimento
}

export function salvarInfo(e, alimentosDaPesquisa) {
    const id = e.parentNode.parentNode.getAttribute('id')
    alimentosDaPesquisa.forEach((item) => {
        if (item.index == id) {
            setarInfoLocalStorage(item.alimento)
        }
    })
}
