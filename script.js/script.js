window.addEventListener('DOMContentLoaded', () => {
    const btnProcurarAlimento = document.querySelector('.procurar-alimentos')
    const inputNutriente = document.querySelector('.nutriente')
    const inputQuantidade = document.querySelector('.quantidade')
    const main = document.querySelector('main')

    function construirDivAlimento(arrayNutrientes) {
        const paragrafoFibra = document.createElement('p')
        const paragrafoCarboidrato = document.createElement('p')
        const paragrafoGordura = document.createElement('p')
        const paragrafoProteina = document.createElement('p')
        const paragrafoCalorias = document.createElement('p')
        const divInfoAlimnto = document.createElement('div')
        const itemComida = item.food
        const arrayNutrientes = itemComida.nutrients
        const divAlimento = document.createElement('div')
        const imgComida = document.createElement('img')
        const h2 = document.createElement('h2')
        divAlimento.classList.add('card-alimento')
        imgComida.src = itemComida.image == undefined ? './imagens/sem-comida.png' : itemComida.image
        h2.textContent = itemComida.label
        paragrafoFibra.innerHTML = `<span class="verde">Fibras </span>: ${arrayNutrientes.FIBTG}`
        paragrafoCarboidrato.innerHTML = `<span class="verde">Carboidrato </span>: ${arrayNutrientes.CHOCDF}`
        paragrafoGordura.innerHTML = `<span class="verde">Gordura </span>: ${arrayNutrientes.FAT}`
        paragrafoProteina.innerHTML = `<span class="verde">Proteina </span>: ${arrayNutrientes.PROCNT}`
        paragrafoCalorias.innerHTML = `<span class="verde">Calorias </span>: ${arrayNutrientes.ENERC_KCAL}`
        divInfoAlimnto.append(paragrafoFibra, paragrafoCarboidrato, paragrafoGordura, paragrafoProteina, paragrafoCalorias)
        divAlimento.append(h2, imgComida, divInfoAlimnto)
        return divAlimento
    }

    btnProcurarAlimento.addEventListener('click', async () => {
        if (main.childElementCount == 2) {
            main.removeChild(main.firstChild)
        }
        const sectionAlimentos = document.createElement('section')
        sectionAlimentos.classList.add('alimentos-escolhidos')
        main.insertBefore(sectionAlimentos, main.firstChild)
        let nutriente = ''
        switch (inputNutriente.value.toLowerCase()) {
            case 'calorias':
                nutriente = 'ENERC_KCAL'
                break
            case 'carboidrato':
                nutriente = 'CHOCDF'
                break
            case 'gordura':
                nutriente = 'FAT'
                break
            case 'proteina':
                nutriente = 'PROCNT'
                break
            case 'fibras':
                nutriente = 'FIBTG'
                break
            default:
                nutriente = 'ENERC_KCAL'
                break

        }
        const resquest = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=6aeb502d&app_key=1c71a98521b6bb239b6dd0eb03b0b0ca&nutrients%5B${nutriente}%5D=${inputQuantidade.value}%2B&`)
        const json = await resquest.json()
        const infoAlimentos = Array.from(json.hints)
        
        infoAlimentos.forEach((item) => {
            sectionAlimentos.appendChild(construirDivAlimento(itemComida.nutrients))
        })

    })
}
)