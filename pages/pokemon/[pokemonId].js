import { useRouter } from "next/router";
import Card from '../../components/Card';

function Pokemon({ pokemon, pokemonSpecies }) {
  const router = useRouter();
  const { pokemonId } = router.query;

  function getTypeColor(type) {
    switch (type) {
      case "grass":
        return "bg-green-400";

      case "fire":
        return "bg-red-400";

      case "poison":
        return "bg-purple-500";

      case "flying":
        return "bg-gray-200";

      default:
        return "bg-red-50";
    }
  }

  return (
    <div className="flex justify-center">
      <Card className="md:w-1/2">
        <div className="flex justify-center border-b border-gray-200">
          <img
            src={
              pokemon[0].sprites["other"]["official-artwork"]["front_default"]
            }
            alt={pokemonId}
            className="
              h-full w-5/6
              md:w-1/2"
          />
        </div>
        <div className="p-2 py-4">
          <div className="flex justify-between items-center flex-row">
            <p className="text-2xl font-bold">{pokemonId}</p>
            <div className="flex justify-end items-center flex-row">
              {pokemon[0].types.map((type, index) => {
                return (
                  <div
                    key={index}
                    className={`${getTypeColor(type.type.name)} 
                    mx-2 px-4 py-1 rounded-2xl font-bold`}
                  >
                    <p>{type.type.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-3">
            <div className="pb-2">
              <p className="text-lg pb-3 pt-2">
                {pokemonSpecies["flavor_text_entries"][0]["flavor_text"]}
              </p>
              <h3 className="text-lg font-bold">Basic Information</h3>
              <div className="flex flex-row pt-2">
                <div className="border border-red-300 rounded-2xl mx-2 px-2 py-1 text-md">
                  {pokemon[0].weight} g
                </div>
                <div className="border border-red-300 rounded-2xl mx-2 px-2 py-1 text-md">
                  {pokemon[0].height} cm
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">Abilities</h3>
              <div className="flex flex-row pt-2">
                {pokemon[0].abilities.map((ability, index) => {
                  if (!ability["is_hidden"]) {
                    return (
                      <div
                        key={index}
                        className="border border-red-300 rounded-2xl mx-2 px-2 py-1 text-md"
                      >
                        {ability.ability.name}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Pokemon;

export async function getStaticPaths() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  const res = await fetch(url);
  const { results } = await res.json();

  const paths = results.map((result) => ({
    params: { pokemonId: result.name },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const url = `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`;
  const res = await fetch(url);

  const pokemon = res.json();

  let finalPokemon = [];

  await pokemon.then((res) => {
    finalPokemon.push({
      abilities: res.abilities,
      height: res.height,
      id: res.id,
      species: res.species,
      sprites: res.sprites,
      types: res.types,
      weight: res.weight,
    });
  });

  // fetch para pegar a descrição do pokemon
  const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${params.pokemonId}`;
  const resSpecies = await fetch(urlSpecies);
  const pokemonSpecies = resSpecies.json();

  let finalPokemonSpecies = {};

  await pokemonSpecies.then((res) => {
    finalPokemonSpecies = { ...res };
  });

  return {
    props: {
      pokemon: finalPokemon,
      pokemonSpecies: finalPokemonSpecies,
    },
  };
}
