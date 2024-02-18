// the game is to guess the Pokemon by the color palette

import React from "react";
import { useState, useEffect } from "react";
import species from "./json/species.json";

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const [pokeData, setPokeData] = useState({});
  const [isShiny, setIsShiny] = useState(false);
  const [colorPalette, setColorPalette] = useState(["", "", ""]);
  const [suggestions, setSuggestions] = useState([]);
  const [generation, setGeneration] = useState(0);
  const genList = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Paldea",
  ];
  const [sillhouetteRevealed, setSillhouetteRevealed] = useState(false);
  const [previousGames, setPreviousGames] = useState([]);
  const [typesRevealed, setTypesRevealed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gameMode, setGameMode] = useState("normal");
  const [isVictory, setIsVictory] = useState(false);
  const [isGameOverPopupOpen, setIsGameOverPopupOpen] = useState(false);

  let randomPokemon = "";

  useEffect(() => {
    document
      .getElementsByClassName("bmc-btn-container")[0]
      .classList.add("game");
  }, []);

  useEffect(() => {
    //check if the pokemon has already been randomly selected
    // if (!previousGames.includes(pokemon)) {
    setPokemon(
      Object.keys(species)[
        Math.floor(Math.random() * Object.keys(species).length)
      ]
    );
    // } else {
    while (previousGames.includes(pokemon)) {
      //   setPokemon(
      randomPokemon =
        Object.keys(species)[
          Math.floor(Math.random() * Object.keys(species).length)
        ];
      //   );
    }
  }, []);

  useEffect(() => {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPokeData(data);
    //   });
    setTimeout(() => {
      writeOnCanvas();
    }, 1);
  }, [pokemon, isShiny]);

  function writeOnCanvas() {
    console.log("writing on canvas");
    const myCanvas = document.getElementById("canvas");
    const imgData = document.getElementById("imgData");
    const myContext = myCanvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgData.src;
    img.onload = () => {
      myContext.beginPath();
      myContext.clearRect(0, 0, 100, 100);
      myContext.stroke();
      myContext.drawImage(img, 0, 0, 100, 100);
      const imageData = myContext.getImageData(
        0,
        0,
        myCanvas.width,
        myCanvas.height
      );
      const rgbValues = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        let r = imageData.data[i];
        let r1 = Math.floor(r / 16).toString(16);
        let r2 = ((r / 16 - Math.floor(r / 16)) * 16).toString(16);
        let g = imageData.data[i + 1];
        let g1 = Math.floor(g / 16).toString(16);
        let g2 = ((g / 16 - Math.floor(g / 16)) * 16).toString(16);
        let b = imageData.data[i + 2];
        let b1 = Math.floor(b / 16).toString(16);
        let b2 = ((b / 16 - Math.floor(b / 16)) * 16).toString(16);
        const rgb = "#" + r1 + r2 + g1 + g2 + b1 + b2;
        rgbValues.push(rgb);
      }
      let counts = {};
      for (let i = 0; i < rgbValues.length; i++) {
        if (!(rgbValues[i] in counts)) {
          counts[rgbValues[i]] = 1;
        } else {
          counts[rgbValues[i]] = counts[rgbValues[i]] + 1;
        }
      }

      delete counts["#101010"];
      delete counts["#000000"];
      delete counts["#0f0f0f"];
      delete counts["#010101"];
      delete counts["#080808"];
      delete counts["#202020"];
      delete counts["#181818"];
      delete counts["#181810"];
      delete counts["#292929"];

      console.log(
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map((item) => item[0])[(0, 1, 2)]
      );

      setColorPalette([
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map((item) => item[0])[0],
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map((item) => item[0])[1],
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map((item) => item[0])[2],
      ]);
    };
  }

  function checkChoice(choice) {
    if (choice === pokemon) {
      setIsVictory(true);
      setGeneration(0);
      setTypesRevealed(false);
      setSillhouetteRevealed(false);
      setAttempts(0);
      setIsGameOver(false);
    } else {
      alert("Incorrect!");
      setAttempts(attempts + 1);
    }
    document.querySelector("input").value = "";
  }

  return (
    <div className="Game">
      <h1>Game</h1>
      <p>Guess the Pokemon by the color palette</p>
      <p>Attempts: {attempts}</p>
      <div className="palette">
        <div
          id="color1"
          className="color"
          style={{
            backgroundColor: colorPalette[0],
          }}
        >
          {generation !== 0 ? (
            <h2 className="gen">
              <p>Gen {generation}</p>
              <p>{genList[generation - 1]}</p>
            </h2>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              if (species[pokemon] <= 151) {
                setGeneration(1);
              } else if (species[pokemon] <= 251) {
                setGeneration(2);
              } else if (species[pokemon] <= 386) {
                setGeneration(3);
              } else if (species[pokemon] <= 493) {
                setGeneration(4);
              } else if (species[pokemon] <= 649) {
                setGeneration(5);
              } else if (species[pokemon] <= 721) {
                setGeneration(6);
              } else if (species[pokemon] <= 809) {
                setGeneration(7);
              } else if (species[pokemon] <= 898) {
                setGeneration(8);
              } else {
                setGeneration(9);
              }
            }}
          >
            Reveal generation
          </button>
          <button
            onClick={() => {
              fetch(`https://pokeapi.co/api/v2/pokemon/${species[pokemon]}`)
                .then((response) => response.json())
                .then((data) => {
                  setPokeData(data);
                  setTypesRevealed(true);
                });
            }}
          >
            Reveal type(s)
          </button>
          <button
            onClick={() => {
              setSillhouetteRevealed(true);
            }}
          >
            Reveal sillhouette
          </button>
        </div>
        <div
          id="color2"
          className="color"
          style={{
            backgroundColor: colorPalette[1],
          }}
        >
          {sillhouetteRevealed ? (
            <img
              src={
                species[pokemon] === 1026
                  ? isShiny
                    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" +
                      species[pokemon] +
                      ".png"
                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
                      species[pokemon] +
                      ".png"
                  : isShiny
                  ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
                      species[pokemon] +
                      ".png" || ""
                  : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      species[pokemon] +
                      ".png" || ""
              }
              alt="sillhouette"
              className={"sillhouette " + (sillhouetteRevealed ? "" : "hidden")}
            />
          ) : (
            ""
          )}
        </div>
        <div
          id="color3"
          className="color"
          style={{
            backgroundColor: colorPalette[2],
          }}
        >
          {typesRevealed ? (
            <>
              <img
                src={
                  "https://www.serebii.net/pokedex-bw/type/" +
                  pokeData.types[0].type.name +
                  ".gif"
                }
                alt={pokeData.types[0].type.name}
                className="type"
              />
              {pokeData.types[1] ? (
                <img
                  src={
                    "https://www.serebii.net/pokedex-bw/type/" +
                    pokeData.types[1].type.name +
                    ".gif"
                  }
                  alt={pokeData.types[1].type.name}
                  className="type"
                />
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="inputWrapper">
        <input
          type="text"
          placeholder="Enter the Pokemon name..."
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            if (value.length > 1) {
              const suggestions = Object.keys(species).filter((item) =>
                item.includes(value)
              );
              setSuggestions(suggestions);
            } else {
              setSuggestions([]);
            }
          }}
        />
        <div
          id="suggestionsWrapper"
          className={suggestions.length > 0 ? "" : "empty"}
        >
          <div id="suggestions">
            {suggestions.map((item, index) => {
              return (
                <button
                  className="suggestion"
                  key={index}
                  onClick={() => {
                    setSuggestions([]);
                    checkChoice(item);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 40) {
                      e.preventDefault();
                      // select the next one
                      if (index < suggestions.length - 1) {
                        document
                          .querySelectorAll(".suggestion")
                          [index + 1].focus();
                      }
                    } else if (e.keyCode === 38) {
                      e.preventDefault();
                      // select the previous one
                      if (index > 0) {
                        document
                          .querySelectorAll(".suggestion")
                          [index - 1].focus();
                      }
                    }
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="sprite">
                    {" "}
                    <img
                      src={
                        species[item] === 1026
                          ? isShiny
                            ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" +
                              species[item] +
                              ".png"
                            : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
                              species[item] +
                              ".png"
                          : isShiny
                          ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
                              species[item] +
                              ".png" || ""
                          : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                              species[item] +
                              ".png" || ""
                      }
                      alt="sprite"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className={"gameModes " + gameMode}>
        <button
          onClick={() => {
            setIsShiny(false);
            setGameMode("normal");
          }}
        >
          Normal
        </button>
        <button
          onClick={() => {
            setIsShiny(true);
            setGameMode("shiny");
          }}
        >
          Shiny
        </button>
        {/* <button
          onClick={() => {
            // setIsShiny(true);
            setGameMode("hard");
          }}
        >
          Hard mode
        </button> */}
      </div>
      <button
        className="giveUp noSelect"
        onClick={() => {
          //   setPreviousGames([...previousGames, pokemon]);
          //   setIsGameOver(true);
          setIsGameOverPopupOpen(true);
          // setPokemon(
          //   Object.keys(species)[
          //     Math.floor(Math.random() * Object.keys(species).length)
          //   ]
          // );
          // setGeneration(0);
          // setTypesRevealed(false);
          // setSillhouetteRevealed(false);
        }}
      >
        Give up?
      </button>
      <div
        className="pokemon"
        style={{
          display: "none",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>{pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</h2>
        <img
          src={
            species[pokemon] === 1026
              ? isShiny
                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" +
                  species[pokemon] +
                  ".png"
                : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
                  species[pokemon] +
                  ".png"
              : isShiny
              ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
                  species[pokemon] +
                  ".png" || ""
              : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  species[pokemon] +
                  ".png" || ""
          }
          alt={pokeData.name}
          id="imgData"
        />
        <button
          onClick={() => {
            setPokemon(
              Object.keys(species)[
                Math.floor(Math.random() * Object.keys(species).length)
              ]
            );
            setGeneration(0);
            setTypesRevealed(false);
            setSillhouetteRevealed(false);
            setIsGameOver(false);
          }}
        >
          Play again
        </button>
        <canvas
          id="canvas"
          willReadFrequently="true"
          style={{ display: "none" }}
        ></canvas>
      </div>
      <div
        className={
          "popupWrapper" +
          (isGameOver || isGameOverPopupOpen || isVictory
            ? " active"
            : " hidden")
        }
      >
        <div className="backdrop"></div>

        <dialog open={isGameOverPopupOpen} className="popup gameover">
          {/* <h2>Game over!</h2> */}
          {isGameOver ? (
            <h2>Game over!</h2>
          ) : (
            <h2>Are you sure you want to give up?</h2>
          )}
          <div
            className="reveal"
            style={{
              display: isGameOver ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>
              The Pokemon was{" "}
              {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
            </p>
            <img
              src={
                species[pokemon] === 1026
                  ? isShiny
                    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" +
                      species[pokemon] +
                      ".png"
                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
                      species[pokemon] +
                      ".png"
                  : isShiny
                  ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
                      species[pokemon] +
                      ".png" || ""
                  : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      species[pokemon] +
                      ".png" || ""
              }
              alt={pokeData.name}
              id="imgData"
            />
            <button
              onClick={() => {
                setPreviousGames([...previousGames, pokemon]);
                setIsGameOver(false);
                setIsGameOverPopupOpen(false);
                setIsVictory(false);
                setPokemon(
                  Object.keys(species)[
                    Math.floor(Math.random() * Object.keys(species).length)
                  ]
                );
                setGeneration(0);
                setTypesRevealed(false);
                setSillhouetteRevealed(false);
              }}
            >
              Play again
            </button>
            <a href={"..?pokemon=" + pokemon} >
              Explore {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}'s
              color palette in action
            </a>
          </div>
          {
            !isGameOver ? (
              //yes and no buttons

              <div className="buttons">
                <button
                  onClick={() => {
                    setIsGameOver(true);
                  }}
                  className="yes"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setIsGameOverPopupOpen(false);
                  }}
                  className="no"
                >
                  No
                </button>
              </div>
            ) : (
              ""
            ) //play again button
          }
        </dialog>
        <dialog open={isVictory} className="popup victory">
          <img
            src="https://www.icegif.com/wp-content/uploads/icegif-105.gif"
            alt="victory"
            className="confetti"
          />
          <h2>Victory!</h2>
          <p>
            The Pokemon was {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
          </p>
          <img
            src={
              species[pokemon] === 1026
                ? isShiny
                  ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" +
                    species[pokemon] +
                    ".png"
                  : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
                    species[pokemon] +
                    ".png"
                : isShiny
                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
                    species[pokemon] +
                    ".png" || ""
                : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                    species[pokemon] +
                    ".png" || ""
            }
            alt={pokeData.name}
            id="imgData"
            className="pokemon"
          />
          <div className="buttons">
            <button
              onClick={() => {
                setIsVictory(false);
                setIsGameOver(false);
                setIsGameOverPopupOpen(false);
                setPokemon(
                  Object.keys(species)[
                    Math.floor(Math.random() * Object.keys(species).length)
                  ]
                );
                setGeneration(0);
                setTypesRevealed(false);
                setSillhouetteRevealed(false);
              }}
            >
              Play again
            </button>
            {/* <a href="https://www.buymeacoffee.com/yassenshopov" target="_blank">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
            //   className="bmc"
            />
            </a> */}
          </div>
          <a href={"..?pokemon=" + pokemon}>
            Explore {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}'s color
            palette in action
          </a>
        </dialog>
      </div>
    </div>
  );
}
