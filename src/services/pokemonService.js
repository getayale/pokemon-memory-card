export async function fetchPokemonList(){
    const response=await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");

    if(!response.ok){
        throw new Error("Failed to fetch Pokémon");
    }

    const data=await response.json();


    return data.results;
}


export async function fetchPokemonDetails(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }

  const pokemon = await response.json();

  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites.other?.["official-artwork"]?.front_default ??
      pokemon.sprites.front_default,
  };
}