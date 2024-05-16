import * as utils from './utils.js'
export let alimentosDaPesquisa = [] 

if (window.location.pathname == '/index.html'){
    window.addEventListener('DOMContentLoaded', () => {
        utils.setarInfoInicialLocalStorage()
        const btnProcurarAlimento = document.querySelector('.procurar-alimentos')
        const inputNutriente = document.querySelector('.nutriente')
        const inputQuantidadeMinima = document.querySelector('.quantidade-minima')
        const inputQuantidadeMaxima = document.querySelector('.quantidade-maxima')
        const main = document.querySelector('main')
    
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
    
        btnProcurarAlimento.addEventListener('click', async () => {
            alimentosDaPesquisa = []
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
                infoAlimentos.forEach((item, index) => {
                    alimentosDaPesquisa.push({alimento: item.food, index})
                    sectionAlimentos.appendChild(utils.construirDivAlimento(item.food, index))
                })
            } else {
                alert('Nenhum alimento encontrado')
            }
    
        })
     
    }
    )
}
