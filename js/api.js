let container = document.querySelector('.formContainerSec');

let nextLink = "";
let prevLink = "";
let searchPokemon = "";
let newUrl = "";

const urlAPI = "https://pokeapi.co/api/v2/pokemon/";


const clearContainer = () => container.innerHTML = '';

// SEARCH

const searchPoke = async () => {

    searchPokemon = document.getElementById('searchPokemon').value;
    try {
        newUrl = `${urlAPI}${searchPokemon}`;
        const response = await fetch(newUrl);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const pokeSearch = await response.json();
        await clearContainer();
        insertPokemon(pokeSearch);

    } catch (error) {
        console.log("El pokemon no existe:", error);
    }


}


// PAGINATE

const back = () => {
    if (prevLink != null) {
        pokemonList(prevLink);
    }
}

const next = () => {
    if (nextLink != null) {
        pokemonList(nextLink);
    }
}

// CONTENT

const pokemonList = async (url) => {
    try {
        const response = await fetch(url);
        const pokemonData = await response.json();
        console.log("Lista general: ", pokemonData);  //listado general de datos de la API

        nextLink = pokemonData.next;
        prevLink = pokemonData.previous;
        
        cargarPokemons(pokemonData.results);

    } catch (error) {
        console.log(error);
    }
}

const cargarPokemons = async (results) => {
    try {
        await clearContainer();
        for (const items of results) {

            // console.log(items.name)

            const response = await fetch(items.url);
            const pokeList = await response.json();

            console.log("Lista de pokemons", pokeList);  //listado de pokemons

            insertPokemon(pokeList);
        }
    } catch (error) {
        console.log("Error al obtener los datos del pokemon:", error);
    }
}

const insertPokemon = (pokeList) => {
    // console.log("Pokemon: ", pokeList.name, "base: ", pokeList.base_experience);

    const name = pokeList.name;
    const image = pokeList.sprites.other.dream_world.front_default;
    const tipo = pokeList.types.map((type) => type.type.name);

    let card = document.createElement('div');
    let content = `
            <img src="${image}" alt="${name}" class="formatImgPok">
            <h3 class="formatName" >${name}</h3>
            <p class="formatName">${tipo}</p>
        `;
    
    card.innerHTML = content;
    card.classList.add('cardFormat');
    container.appendChild(card);

}


pokemonList(`${urlAPI}`);
// pokemonList(`${urlAPI}?offset=0&limit=12`);