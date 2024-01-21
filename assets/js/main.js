const pokemonList = document.getElementById('pokemonList')
// const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 151
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.types.map((type) => type).join(' ')}">
        <span class="number">
            <span class="order-number" id="pokemon-${pokemon.orderNumber}">#${pokemon.orderNumber.toString().padStart(3, '0')}</span>
        </span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            <div class="poke-img">
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </div>
        <div class="pokemon-btn" id="pokedetails-btn">${pokemon.name} details</div>
        <ul class="stats-board">
            <li id="board-att-stats">Stats</li>
            <li id="board-att-attr">Attributes</li>
            <li id="board-att-info">Info</li>
        </ul>
        <ul class="main-stats">
            <li class="grid">Weight <span class="stats-align">${pokemon.weight / 10} kg</span></li>
            <li class="grid">Height <span class="stats-align">${pokemon.height / 10} m</span></li>
            <li class="grid">Main Move <span class="stats-align c-text">${pokemon.mainMove}</span></li>
            <li class="grid">Abilities <span class="stats-align c-text">${pokemon.abilities.join(', ')}</span></li>
        </ul>
        <ul class="poke-stats">
        <li class="stats-li">HP</li> <li>${pokemon.hp}</li> <li class="poke-bar">
            <div class="bar bar-hp" style="width: ${pokemon.hp}%">&nbsp;</div>
        </li>
        <li class="stats-li">ATK</li> <li>${pokemon.atk}</li> <li class="poke-bar">
            <div class="bar bar-atk" style="width: ${pokemon.atk}%">&nbsp;</div>
        </li>
        <li class="stats-li">DEF</li> <li>${pokemon.def}</li> <li class="poke-bar">
            <div class="bar bar-def" style="width: ${pokemon.def}%">&nbsp;</div>
        </li>
        <li class="stats-li">SATK</li> <li>${pokemon.spcatk}</li> <li class="poke-bar">
            <div class="bar bar-satk" style="width: ${pokemon.spcatk}%">&nbsp;</div>
        </li>
        <li class="stats-li">SDEF</li> <li>${pokemon.spcdef}</li> <li class="poke-bar">
            <div class="bar bar-sdef" style="width: ${pokemon.spcdef}%">&nbsp;</div>
        </li>
        <li class="stats-li">SPD</li> <li>${pokemon.speed}</li> <li class="poke-bar">
            <div class="bar bar-spd" style="width: ${pokemon.speed}%">&nbsp;</div>
        </li>
        </ul>
        <div class="poke-story">
            <div class="storyDiv">
                <p class="main-story">${pokemon.storyEn}</p>
            </div>
        </div>
        <div class="button-class">
            <input type="button" class="closeButton" id="closeBtn">
        </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// loadMoreButton.addEventListener('click', () => {
// offset += limit
// const qtdRecordsWithNexPage = offset + limit

//     if (qtdRecordsWithNexPage >= maxRecords) {
//         const newLimit = maxRecords - offset
//         loadPokemonItens(offset, newLimit)

//         loadMoreButton.parentElement.removeChild(loadMoreButton)
//     } else {
//         loadPokemonItens(offset, limit)
//     }
// })

let pokeInfoDetails = document.getElementById('poke-info-details-id')
let closePokeInfoDetailsBtn = document.getElementById('closeBtn')

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pokemon-btn')) {
        pokeInfoDetails.style.display = 'flex'
        let currentPoke = e.target.parentElement
        let pokeLi = document.getElementById('pokemon-info-id')
        pokeLi.innerHTML = currentPoke.innerHTML
        let pokeClass = currentPoke.classList[1]
        pokeLi.classList = pokeClass
        pokeLi.classList.add('show')
    }
    if (e.target.id == 'closeBtn') {
        pokeInfoDetails.style.display = 'none'
    }
    if (e.target.innerHTML == "Attributes") {
        let attUlMainStats = document.querySelector(".poke-info-details .main-stats")
        let pokeStatsUl = document.querySelector(".poke-info-details .poke-stats")
        let pokeStory = document.querySelector(".poke-info-details .poke-story")
        attUlMainStats.style.display = "flex"
        pokeStatsUl.style.display = "none"
        pokeStory.style.display = "none"
    }
    if (e.target.innerHTML == "Stats") {
        let attUlMainStats = document.querySelector(".poke-info-details .main-stats")
        let pokeStatsUl = document.querySelector(".poke-info-details .poke-stats")
        let pokeStory = document.querySelector(".poke-info-details .poke-story")
        attUlMainStats.style.display = "none"
        pokeStatsUl.style.display = "grid"
        pokeStory.style.display = "none"
    }
    if (e.target.innerHTML == "Info") {
        let attUlMainStats = document.querySelector(".poke-info-details .main-stats")
        let pokeStatsUl = document.querySelector(".poke-info-details .poke-stats")
        let pokeStory = document.querySelector(".poke-info-details .poke-story")
        attUlMainStats.style.display = "none"
        pokeStatsUl.style.display = "none"
        pokeStory.style.display = "flex"
    }
})