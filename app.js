const pokedex = document.getElementById("pokedex");
const poke = document.getElementById('pokemon')

const fetchAllPokemon = () => {

    const promises = [];

    for (let i = 1; i <= 900; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        Promise.all(promises).then(results => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites["front_default"],
                types: data.types.map(type => type.type.name).join(', '),
            }));
            displayPokemon(pokemon);
            console.log(pokemon.types)
        });
    };
}

const displayPokemon = (pokemon) => {
    console.log(pokemon);

    const pokemonHTML = pokemon.map(mon => `
    <li class="card">
        <img class="card-image" src="${mon.image}"/>
        <h2 class="card-title">${mon.id}. ${mon.name}</h2>
        <p class="card-subtitle">Types: ${mon.types}</p>
    </li>
    `).join("");

    pokedex.innerHTML= pokemonHTML;
}

fetchAllPokemon();
