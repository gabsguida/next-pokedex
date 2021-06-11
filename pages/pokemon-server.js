import Link from "next/link";
import Card from "../components/Card";

function PokemonServer({ pokemons }) {
  return (
    <div
      className="
          flex justify-center flex-col items-center w-full
          md:grid md:grid-cols-2 md:gap-8 md:justify-items-center
          lg:grid-cols-3"
    >
      {pokemons.map((pokemon, index) => {
        return (
          <Card
            key={index}
            className="
                  p-4 
                  xl:w-5/6"
          >
            <Link href={`/pokemon/${pokemon.name}`}>
              <a
                className="
                      flex flex-col items-start justify-center cursor-pointer"
              >
                <div
                  className="
                      self-center w-5/6 h-full
                      lg:w-auto"
                >
                  <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div>
                  <p className="text-xl"># {pokemon.paddedId}</p>
                  <p className="text-2xl font-bold">{pokemon.name}</p>
                </div>
              </a>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}

export default PokemonServer;

export async function getServerSideProps(context) {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  const res = await fetch(url);
  const { results } = await res.json();

  const pokemons = results.map((pokeman, index) => {
    const paddedId = ("00" + (index + 1)).slice(-3);

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return {
      ...pokeman,
      paddedId: paddedId,
      image: image,
    };
  });

  return {
    props: {
      pokemons: pokemons,
    },
  };
}
