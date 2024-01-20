
const pokeApi = {}

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.orderNumber = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability
    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.atk = pokeDetail.stats[1].base_stat
    pokemon.def = pokeDetail.stats[2].base_stat
    pokemon.spcatk = pokeDetail.stats[3].base_stat
    pokemon.spcdef = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat
    pokemon.mainMove = pokeDetail.moves[0].move.name

    pokemon.species = pokeDetail.species

    await fetch(pokeDetail.species.url)
        .then((res) => res.json())
        .then((story) => {
            story.flavor_text_entries.map((text) => {
                if (text.language.name === 'en' && text.version.name === 'red') {
                    let modifiedText = text.flavor_text.replace(/\f/g, ' ');
                    modifiedText = modifiedText.replace(/POKéMON/g, 'Pokémon');
                    pokemon.storyEn = modifiedText;
                }
            });
        })

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
