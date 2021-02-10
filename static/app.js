const pokedex = document.getElementById("pokedex");
const poke = document.getElementById('pokemon')
const btnContainer = document.getElementById('btnContainer');

/**
 * Generates buttons to filter types from types array
 * @return {void} Renders buttons onto btnContainer class
 */
const showButtons = () => {
    const types = ["normal", "fire", "water", "electric", "grass", "ice", 
    "fighting", "poison", "ground", "flying", "psychic", "bug", 
    "rock", "ghost", "dragon", "dark", "steel"];
    const btnArray = []
    
    types.forEach(type => {
        btnArray.push(`
        <button class="btni" onclick="filterSelection('${type}')">${type}</button>
        `)
    })

    btnContainer.innerHTML = `<button class="btni active" onclick="filterSelection('all')">Show all</button>
    `+btnArray.join("");
}

/**
 * Fetches from PokeAPI the pokemon data to be displayed
 * @returns {void} Renders the cards with all Pokemon data
 */
const fetchAllPokemon = () => {

    const promises = [];

    // Set i condition to 898 to get all pokemon up to Gen 8
    for (let i = 1; i <= 898; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        Promise.all(promises).then(results => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites["front_default"],
                types: data.types.map(type => type.type.name),
            }));
            displayPokemon(pokemon);
        });
    };
}

/**
 * Generates an HTML card for all the Pokemon in the object
 * @param {object} pokemon - Pokemon object from PokeAPI
 * @returns {void} Renders cards in unordered list with id=Pokedex
 */
const displayPokemon = (pokemon) => {
    const pokemonHTML = pokemon.map(mon => `
    <a href="${mon.name}" class="card-i show ${mon.types.join(' ')}">
    <li>
        <img class="card-i-image" src="${mon.image}"/>
        <h2 class="card-i-title">${mon.id}. ${mon.name}</h2>
        <p class="card-i-subtitle">Types: ${mon.types.join(', ')}</p>
    </li>
    </a>
    `).join("");

    pokedex.innerHTML= pokemonHTML;
}

showButtons();
fetchAllPokemon();

