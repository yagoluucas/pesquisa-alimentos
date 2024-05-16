import * as utils from './utils.js'
window.addEventListener('DOMContentLoaded', () => {
    const arrayAlimentos = utils.pegarInfoLocalStorage('alimentos').alimentos
    const sectionAlimentosSalvos = document.querySelector('.js-alimentos--salvos')
    if (arrayAlimentos.length >= 1) {
        arrayAlimentos.forEach((item) => {
            const alimentoConstruido = utils.construirDivAlimento(item)
            sectionAlimentosSalvos.append(alimentoConstruido)
        })
    } else {
        alert('Sem alimentos cadastrado')
    }
    
})