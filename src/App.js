import Poke from "./Poke";
import Example from "./Example.js";
import { useEffect, useState } from "react";
import Game from "./Game.js";
import { Helmet } from "react-helmet";

export default function App() {
  const [color2, setColor2] = useState("pokeball");
  const [color3, setColor3] = useState("greatball");
  const [color4, setColor4] = useState("ultraball");
  const updateColor2 = (newValue) => {
    setColor2(newValue);
  };
  const updateColor3 = (newValue) => {
    setColor3(newValue);
  };
  const updateColor4 = (newValue) => {
    setColor4(newValue);
  };

  const [typeBall1, setTypeBall1] = useState("healball");
  const [typeBall2, setTypeBall2] = useState("fastball");
  const updateTypeBall1 = (newValue) => {
    setTypeBall1(newValue);
  };
  const updateTypeBall2 = (newValue) => {
    setTypeBall2(newValue);
  };
  const [pokemon, setPokemon] = useState({
    abilities: [
      {
        ability: {
          name: "flash-fire",
          url: "https://pokeapi.co/api/v2/ability/18/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: "weak-armor",
          url: "https://pokeapi.co/api/v2/ability/133/",
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    base_experience: null,
    forms: [
      {
        name: "ceruledge",
        url: "https://pokeapi.co/api/v2/pokemon-form/937/",
      },
    ],
    game_indices: [],
    height: 16,
    held_items: [],
    id: 937,
    is_default: true,
    location_area_encounters:
      "https://pokeapi.co/api/v2/pokemon/937/encounters",
    name: "ceruledge",
    order: 1005,
    past_abilities: [],
    past_types: [],
    species: {
      name: "ceruledge",
      url: "https://pokeapi.co/api/v2/pokemon-species/937/",
    },
    sprites: {
      back_default: null,
      back_female: null,
      back_shiny: null,
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/937.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/937.png",
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default: null,
          front_female: null,
        },
        home: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/937.png",
          front_female: null,
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/937.png",
          front_shiny_female: null,
        },
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/937.png",
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/937.png",
        },
        showdown: {
          back_default: null,
          back_female: null,
          back_shiny: null,
          back_shiny_female: null,
          front_default: null,
          front_female: null,
          front_shiny: null,
          front_shiny_female: null,
        },
      },
      versions: {
        "generation-i": {
          "red-blue": {
            back_default: null,
            back_gray: null,
            back_transparent: null,
            front_default: null,
            front_gray: null,
            front_transparent: null,
          },
          yellow: {
            back_default: null,
            back_gray: null,
            back_transparent: null,
            front_default: null,
            front_gray: null,
            front_transparent: null,
          },
        },
        "generation-ii": {
          crystal: {
            back_default: null,
            back_shiny: null,
            back_shiny_transparent: null,
            back_transparent: null,
            front_default: null,
            front_shiny: null,
            front_shiny_transparent: null,
            front_transparent: null,
          },
          gold: {
            back_default: null,
            back_shiny: null,
            front_default: null,
            front_shiny: null,
            front_transparent: null,
          },
          silver: {
            back_default: null,
            back_shiny: null,
            front_default: null,
            front_shiny: null,
            front_transparent: null,
          },
        },
        "generation-iii": {
          emerald: {
            front_default: null,
            front_shiny: null,
          },
          "firered-leafgreen": {
            back_default: null,
            back_shiny: null,
            front_default: null,
            front_shiny: null,
          },
          "ruby-sapphire": {
            back_default: null,
            back_shiny: null,
            front_default: null,
            front_shiny: null,
          },
        },
        "generation-iv": {
          "diamond-pearl": {
            back_default: null,
            back_female: null,
            back_shiny: null,
            back_shiny_female: null,
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
          "heartgold-soulsilver": {
            back_default: null,
            back_female: null,
            back_shiny: null,
            back_shiny_female: null,
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
          platinum: {
            back_default: null,
            back_female: null,
            back_shiny: null,
            back_shiny_female: null,
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
        },
        "generation-v": {
          "black-white": {
            animated: {
              back_default: null,
              back_female: null,
              back_shiny: null,
              back_shiny_female: null,
              front_default: null,
              front_female: null,
              front_shiny: null,
              front_shiny_female: null,
            },
            back_default: null,
            back_female: null,
            back_shiny: null,
            back_shiny_female: null,
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
        },
        "generation-vi": {
          "omegaruby-alphasapphire": {
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
          "x-y": {
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
        },
        "generation-vii": {
          icons: {
            front_default: null,
            front_female: null,
          },
          "ultra-sun-ultra-moon": {
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
        },
        "generation-viii": {
          icons: {
            front_default: null,
            front_female: null,
          },
        },
      },
    },
    stats: [
      {
        base_stat: 75,
        effort: 0,
        stat: {
          name: "hp",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: 125,
        effort: 2,
        stat: {
          name: "attack",
          url: "https://pokeapi.co/api/v2/stat/2/",
        },
      },
      {
        base_stat: 80,
        effort: 0,
        stat: {
          name: "defense",
          url: "https://pokeapi.co/api/v2/stat/3/",
        },
      },
      {
        base_stat: 60,
        effort: 0,
        stat: {
          name: "special-attack",
          url: "https://pokeapi.co/api/v2/stat/4/",
        },
      },
      {
        base_stat: 100,
        effort: 0,
        stat: {
          name: "special-defense",
          url: "https://pokeapi.co/api/v2/stat/5/",
        },
      },
      {
        base_stat: 85,
        effort: 0,
        stat: {
          name: "speed",
          url: "https://pokeapi.co/api/v2/stat/6/",
        },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/",
        },
      },
      {
        slot: 2,
        type: {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/",
        },
      },
    ],
    weight: 620,
    isShiny: false,
    national_id: 937,
    flavor_text_entries: [
      {
        flavor_text:
          "The fiery blades on its arms burn fiercely with the lingering resentment of a sword wielder who fell before accomplishing their goal.",
        language: {
          name: "en",
          url: "https://pokeapi.co/api/v2/language/9/",
        },
        version: {
          name: "scarlet",
          url: "https://pokeapi.co/api/v2/version/40/",
        },
      },
      {
        flavor_text:
          "An old set of armor steeped in grudges caused this Pokémon’s evolution. Ceruledge cuts its enemies to pieces without mercy.",
        language: {
          name: "en",
          url: "https://pokeapi.co/api/v2/language/9/",
        },
        version: {
          name: "violet",
          url: "https://pokeapi.co/api/v2/version/41/",
        },
      },
    ],
  });
  const updatePokemon = (newValue) => {
    setPokemon(newValue);
  };

  const [isGame, setIsGame] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/game") {
      setIsGame(true);
    }
  }, []);

  const title = "Pokemon Palette - Color Schemes for your Website!";
  const author = "Yassen Shopov";
  const description =
    "Generate color schemes for your website based on your favorite Pokemon! Web-friendly color palettes for your next project.";
  const img = "https://pokemonpalette.com/thumbnail.webp";

  return (
    
    <div className="App">
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="author" content={author}></meta>
        <meta name="description" content={description} />
        <link rel="icon" href="/faviconWh.ico" />
        <meta property="og:image" content={img}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={title}></meta>
        <meta property="twitter:description" content={description}></meta>
      </Helmet> */}
      {isGame ? (
        <Game />
      ) : (
        <>
          <div className="poke">
            <Poke
              updateColor2={updateColor2}
              updateColor3={updateColor3}
              updateColor4={updateColor4}
              updateTypeBall1={updateTypeBall1}
              updateTypeBall2={updateTypeBall2}
              updatePokemon={updatePokemon}
            />
          </div>
          <div className="example">
            <Example
              dynamicContent={[color2, color3, color4, typeBall1, typeBall2]}
              pokemon={pokemon}
            />
          </div>
        </>
      )}
    </div>
  );
}
