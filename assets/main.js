const $containerCards = document.getElementById('pokecards-container')
const $loadingBalls = document.getElementById('loading-balls')

let isFetching = false
const nextURL = {
    next: null
}


const pokeFetch = async () => {
    const baseURL = 'https://pokeapi.co/api/v2/'
    const requestParam = 'pokemon?offset=0&limit=10'
 
    const response = await fetch(baseURL+requestParam)
    console.log(response)
    const data = await response.json()

    renderTotal(data.results)

}

// const renderPokes = poke => {
//     const { id, name, sprites, height, weight, types } = poke

//     return `
//     <div class="poke-card">
//         <h2>${name}</h2>
//         <span class="types"></span>
//         <img src="${sprites}" alt="pika" class="${sprites}">
//         <span class="height">${height}</span>
//         <span class="weight">${weight}</span>
//         <span class="id">${id}</span>
//     </div>
//     `
// }

const renderTotal = async (data) => {

    const dataURLs = data.map(item => item.url)

    const response = dataURLs.map(item => await fetch(item))
    console.log(response)

    
    // $containerCards.innerHTML = data.map(item => renderPokes(item)).join('')

}


const init = () => {
    window.addEventListener('DOMContentLoaded', pokeFetch)

}

init()