const URL = "https://pokeapi.co/api/v2/pokemon";

let offset = 0;
const limit = 10;

const container = document.getElementById("pokemonContainer");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
const btnBuscar = document.getElementById("btnBuscar");
const input = document.getElementById("search");

// 🔹 Obtener lista de pokémon
async function getPokemons() {
  try {
    const res = await fetch(`${URL}?offset=${offset}&limit=${limit}`);
    const data = await res.json();

    container.innerHTML = "";

    for (let pokemon of data.results) {
      const resPoke = await fetch(pokemon.url);
      const dataPoke = await resPoke.json();

      pintarPokemon(dataPoke);
    }
  } catch (error) {
    console.error(error);
  }
}

// 🔹 Pintar Pokémon en pantalla
function pintarPokemon(pokemon) {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.sprites.front_default}" />
  `;

  container.appendChild(div);
}

// 🔹 Botón siguiente
btnNext.addEventListener("click", () => {
  offset += limit;
  getPokemons();
});

// 🔹 Botón anterior
btnPrev.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    getPokemons();
  }
});

// 🔹 Buscar Pokémon
btnBuscar.addEventListener("click", async () => {
  try {
    const nombre = input.value.toLowerCase();

    const res = await fetch(`${URL}/${nombre}`);
    const data = await res.json();

    container.innerHTML = "";
    pintarPokemon(data);
  } catch (error) {
    container.innerHTML = "<p>pokemon no encontrado</p>";
  }
});

// 🔹 Inicial
getPokemons();