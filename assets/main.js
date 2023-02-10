const $containerCards = document.getElementById('pokecards-container')
const $loadingBalls = document.getElementById('loading-balls')
const baseURL = 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=4'


let isFetching = false
const saveInfoAPI = {
    next: null,
    data: []
}


// const pokeFetch = async (info) => {

//     const requestParam = 'pokemon?offset=2&limit=8'

//     const response = await fetch(baseURL+requestParam)
//     const data = await response.json()

//     infoAPI.next = data.next

//     data.results.map(item => loadPokemon(item.url))

//     return infoAPI.next

// }

const pokeFetch = async (info) => {

    let response = await fetch(info)
    let data = await response.json()

    return data

}

const renderPokes = poke => {
    const { id, name, sprites, height, weight, types, base_experience } = poke

    return `
    <div class="poke-card" data_id="${1}">
        <img src="${sprites.other.home.front_default}" alt="pika" class="poke-img">
        <div style="text-align: center">
            <h2>${name.toUpperCase()}</h2>
            <span class="exp">EXP: ${base_experience}</span>
        </div>
        <div class="types-container">
            ${types
                .map(item =>
                    `<span class="${item.type.name} types">${item.type.name}</span>`
                    )
                .join('')
            }
        </div>
        <div class="description" >
            <span class="height">Height: ${height / 10}m</span>
            <span class="weight">Weight: ${weight}kg</span>
        </div>
    </div>
    `
}

const loadPokemon = async (initDOM, scrolling) => {

    if (initDOM) {
        console.log(init)

        let response = await fetch(initDOM)
        let pokeData = await response.json()

    
        $containerCards.innerHTML += renderPokes(pokeData)
        
    } 

    if (scrolling) {

        let response = await fetch(scrolling)
        let pokeData = await response.json()

        
        if(isFetching = true){

            
            setTimeout(() => {
                $loadingBalls.classList.add('showLoad')
            }, 300);
        
            
            
            setTimeout(() => {
                $containerCards.innerHTML += renderPokes(pokeData)
                $loadingBalls.classList.remove('showLoad')
            }, 1500);

            


            
            return isFetching = false

        }

    } 

 
}



const init = () => {
   
    window.addEventListener('DOMContentLoaded', async () => {
        let { next, results } = await pokeFetch(baseURL)

        let nextResponse = next
        saveInfoAPI.next = nextResponse

        let resultsResponse = results
        resultsResponse.map((item) => saveInfoAPI.data.push(item.url))

        saveInfoAPI.data.map(item => loadPokemon(item, null))
        
        // URLs.map(item => loadPokemon(item)) //ACA LE VOY MANDANDO 1 X 1 LOS URLs A LA FUNCIÓN DE LOAD PARA RENDERIZARLOS... EN LOADPOKEMON, GUARDO URL X URL
        
    })


    window.addEventListener('scroll', async () => {
        let { clientHeight, scrollTop, scrollHeight } = document.documentElement
        let { next, results } = await pokeFetch(saveInfoAPI.next)

        if(scrollTop + clientHeight >= scrollHeight -5 && !isFetching) {

        isFetching = true

        let fetchResponse = await pokeFetch(saveInfoAPI.next) 
        
        let nextResponse = next
        saveInfoAPI.next = nextResponse

        let resultsResponse = await results
        resultsResponse.map((item) => saveInfoAPI.data.push(item.url))


        saveInfoAPI.data.map(item => loadPokemon(null, item))
        }
    })

}
   



init()