export function setarInfoInicialLocalStorage(){
    const alimento = localStorage.getItem('alimentos')
    if (alimento == null) {
        localStorage.setItem('alimentos', JSON.stringify([]))
        localStorage.setItem('chaveAlimento', 0)
    }
}

export function pegarInfoLocalStorage(info){
    return localStorage.getItem(info)
}

export function setarInfoLocalStorage(info, valor){
    localStorage.setItem(info, JSON.stringify(valor))
}