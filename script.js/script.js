window.addEventListener('DOMContentLoaded', () => {
    const btnProcurarAlimento = document.querySelector('.procurar-alimentos')
    const inputNutriente = document.querySelector('.nutriente')
    const inputQuantidade = document.querySelector('.quantidade')
    const sectionAlimentos = document.querySelector('.alimentos-escolhidos')

    btnProcurarAlimento.addEventListener('click', async () => {
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
            default:
                nutriente = 'ENERC_KCAL'
                break

        }
        const resquest = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=6aeb502d&app_key=1c71a98521b6bb239b6dd0eb03b0b0ca&nutrients%5B${nutriente}%5D=${inputQuantidade.value}%2B&`)
        const json = await resquest.json()
        const infoAlimentos = Array.from(json.hints)
        infoAlimentos.forEach((item) => {
            const itemComida = item.food
            const arrayNutrientes = itemComida.nutrients
            const calorias = arrayNutrientes.ENERC_KCAL
            const proteina = arrayNutrientes.PROCNT
            const gordura = arrayNutrientes.FAT
            const carboidrato = arrayNutrientes.CHOCDF
            const fibra = arrayNutrientes.FIBTG
            const divAlimento = document.createElement('div')
            const imgComida = document.createElement('img')
            const h2 = document.createElement('h2')
            imgComida.src = itemComida.image
            h2.textContent = itemComida.label
            divAlimento.append(fibra, carboidrato, gordura, proteina, calorias, h2, imgComida)
            sectionAlimentos.appendChild(divAlimento)
        })
        
    })
}
)