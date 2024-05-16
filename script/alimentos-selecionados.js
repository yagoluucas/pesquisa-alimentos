import * as utils from './utils.js'
window.addEventListener('DOMContentLoaded', () => {
    const arrayAlimentos = utils.pegarInfoLocalStorage('alimentos').alimentos
    const sectionAlimentosSalvos = document.querySelector('.js-alimentos--salvos')
    const paragrafoCalorias = document.querySelector('li.js-calorias')
    const paragrafoCarboidratos = document.querySelector('li.js-carboidratos')
    const paragrafoProteinas = document.querySelector('li.js-proteinas')
    const paragrafoGorduras = document.querySelector('li.js-gorduras')
    const proteinaGrafico = document.querySelector('span.proteina-grafico')
    const carboidratoGrafico = document.querySelector('span.carboidrato-grafico')
    const gorduraGrafico = document.querySelector('span.gordura-grafico')
    let totalCalorias = 0
    let totalCarboidratos = 0
    let totalProteinas = 0
    let totalGorduras = 0
    if (arrayAlimentos.length >= 1) {
        arrayAlimentos.forEach((item) => {
            totalCalorias += parseFloat(item.nutrients.ENERC_KCAL)
            totalCarboidratos += parseFloat(item.nutrients.CHOCDF)
            totalProteinas += parseFloat(item.nutrients.PROCNT)
            totalGorduras += parseFloat(item.nutrients.FAT)
            const alimentoConstruido = utils.construirDivAlimento(item)
            sectionAlimentosSalvos.append(alimentoConstruido)
        })
    } else {
        alert('Sem alimentos cadastrado')
    }
    paragrafoCalorias.innerHTML = `<span>Total de calorias </span>: ${totalCalorias}`
    paragrafoCarboidratos.innerHTML = `<span>Total de carboidratos</span> : ${totalCarboidratos}`
    paragrafoProteinas.innerHTML = `<span>Total de proteínas</span> : ${totalProteinas}`
    paragrafoGorduras.innerHTML = `<span>Total de gorduras</span> : ${totalGorduras}`

    proteinaGrafico.style.width = `${((((totalProteinas * 4) * 100) / totalCalorias).toFixed(2)) - 1}%`
    proteinaGrafico.innerHTML = `PTN - ${(((totalProteinas * 4) * 100) / totalCalorias).toFixed(2)}%`

    carboidratoGrafico.style.width = `${((((totalCarboidratos * 4) * 100) / totalCalorias).toFixed(2)) - 1}%`
    carboidratoGrafico.innerHTML = `CHO - ${(((totalCarboidratos * 4) * 100) / totalCalorias).toFixed(2)}%`

    gorduraGrafico.style.width = `${((((totalGorduras * 9) * 100) / totalCalorias).toFixed(2)) - 1}%`
    gorduraGrafico.innerHTML = `LIP - ${(((totalGorduras * 9) * 100) / totalCalorias).toFixed(2)}%`
    
})