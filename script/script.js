import setarInfoInicialLocalStorage from './utils.js'
window.addEventListener('DOMContentLoaded', () => {
    const objetoLocalStorage = setarInfoInicialLocalStorage()
    const btnProcurarAlimento = document.querySelector('.procurar-alimentos')
    const inputNutriente = document.querySelector('.nutriente')
    const inputQuantidadeMinima = document.querySelector('.quantidade-minima')
    const inputQuantidadeMaxima = document.querySelector('.quantidade-maxima')
    const main = document.querySelector('main')

    function construirDivAlimento(comida) {
        const paragrafoFibra = document.createElement('p')
        const paragrafoCarboidrato = document.createElement('p')
        const paragrafoGordura = document.createElement('p')
        const paragrafoProteina = document.createElement('p')
        const paragrafoCalorias = document.createElement('p')
        const btnAdicionarAlimento = document.createElement('button')
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
        btnAdicionarAlimento.innerHTML = 'Adicionar Alimento'
        btnAdicionarAlimento.classList.add('btn')
        divInfoAlimnto.append(paragrafoFibra, paragrafoCarboidrato, paragrafoGordura, paragrafoProteina, paragrafoCalorias, btnAdicionarAlimento)
        divAlimento.append(h2, imgComida, divInfoAlimnto)
        return divAlimento
    }

    function pegarNutriente(nutrienteEscolhido) {
        const nutrientes = {
            calorias: 'ENERC_KCAL',
            carboidrato: 'CHOCDF',
            gordura: 'FAT',
            proteina: 'PROCNT',
            fibras: 'FIBTG',
            calcio: 'CA',
            colesterol: 'CHOLE',
            gmonosaturada: 'FAMS',
            gpolinsaturado: 'FAPU',
            gsaturado: 'FASAT',
            gtrans: 'FATRN',
            ferro: 'FE',
            sodio: 'NA',
            açucar: 'SUGAR'
        }
        return nutrientes[nutrienteEscolhido]
    }

    function salvarAlimento(infoAlimento){
        window.localStorage.setItem('')
    }

    btnProcurarAlimento.addEventListener('click', async () => {
        if (main.childElementCount == 2) {
            main.removeChild(main.firstChild)
        }
        const sectionAlimentos = document.createElement('section')
        sectionAlimentos.classList.add('alimentos-escolhidos')
        main.insertBefore(sectionAlimentos, main.firstChild)
        const nutriente = pegarNutriente(inputNutriente.value)

        if (inputQuantidadeMinima.value == '') {
            inputQuantidadeMinima.value = '1'
        }
        if (inputQuantidadeMaxima.value == '') {
            inputQuantidadeMaxima.value = '100'
        }
        const resquest = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=6aeb502d&app_key=1c71a98521b6bb239b6dd0eb03b0b0ca&nutrients%5B${nutriente}%5D=${inputQuantidadeMinima.value}-${inputQuantidadeMaxima.value}&`)
        const json = await resquest.json()
        const infoAlimentos = Array.from(json.hints)
        if (infoAlimentos.length >= 1) {
            infoAlimentos.forEach((item) => {
                sectionAlimentos.appendChild(construirDivAlimento(item.food))
            })
        } else {
            alert('Nenhum alimento encontrado')
        }

    })
}
)