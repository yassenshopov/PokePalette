import React, { useState, useEffect } from "react";
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from "react-icons/bs";
import { IoSparkles, IoSparklesOutline } from "react-icons/io5";
import { RiLoader4Fill } from "react-icons/ri";
import axios from "axios";
import speciesData from "./json/species.json";

let color2, color3, color4, color5, color6, color7, color8, color9, color10;

export default function Poke() {
  let [nameValue, setStateFind] = useState("butterfree");
  let [numValue, setNumValue] = useState(12);
  const [suggestions, setSuggestions] = useState([]);

  const NumChanger = (e) => {
    setIsLoading(true);
    setNumValue(e.target.value);
    setStateFind(e.target.value);
  };

  const NameChanger = (e) => {
    // Generate suggestions
    if (e.target.value.length > 1) {
      const suggestionArray = Object.keys(speciesData).filter(
        (pokemon) =>
          pokemon.startsWith(e.target.value.toLowerCase()) &&
          e.target.value !== "" &&
          e.target.value !== pokemon
      );
      console.log(suggestionArray);
      setSuggestions(suggestionArray);
    } else {
      setSuggestions([]);
    }
    setIsLoading(true);
    setStateFind(e.target.value);
  };

  let [shiny, setShiny] = useState(false);
  let [random, setRandom] = useState(0);

  const ShinyChange = () => {
    setIsLoading(true);
    setShiny(!shiny);
  };

  const Randomize = () => {
    setIsLoading(true);
    let random = 1 + Math.floor(Math.random() * 1008);
    setRandom(random);
    random = random.toString();
    setStateFind(random);
  };

  let [Img, setImg] = useState("");
  let [artURL, setURL] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png"
  );
  const [Type, setType] = useState("");
  let megaEvoRes;
  const [resCopy, setResCopy] = useState({});
  const [evoRes, setEvoRes] = useState({});
  let megaEvoBtnToggle;
  const [pkmnInfoBg, setPkmnInfoBg] = useState("");

  useEffect(() => {
    async function getData() {
      if (speciesData[nameValue.toLowerCase()] || !isNaN(nameValue)) {
        try {
          let res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${nameValue.toLowerCase()}`
          );
          setResCopy(res);
          console.log(res);
          let evoBtnCheck = true;

          // Compulsory clean-up: this removes old data from the evoBtn and sets the stage for a new one

          if (
            typeof document.getElementById("evoBtn") != "undefined" &&
            document.getElementById("evoBtn") != null
          ) {
            document.getElementById("evoBtn").remove();
          }

          if (
            typeof document.getElementById("optionsMenu") != "undefined" &&
            document.getElementById("optionsMenu") != null
          ) {
            document.getElementById("optionsMenu").remove();
          }

          try {
            setEvoRes(
              await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${nameValue.toLowerCase()}`
              )
            );
            console.log(evoRes);
            setPkmnInfoBg("var(--color3)");
          } catch (err) {
            switch (nameValue.toLocaleLowerCase()) {
              case "basculin-red-striped":
              case "basculin-blue-striped":
              case "basculin-white-striped":
                setEvoRes(
                  await axios.get(
                    `https://pokeapi.co/api/v2/pokemon-species/basculin`
                  )
                );
                console.log(evoRes);
            }
            console.log(err);
          }
          try {
            console.log(evoRes.data);
            if (evoRes.data.varieties.length > 1) {
              console.log(evoRes.data.varieties);
              let optionsMenu = document.createElement("select");
              optionsMenu.id = "optionsMenu";
              optionsMenu.onchange = async () => {
                setIsLoading(true);
                let optionsMenu = document.getElementById("optionsMenu");
                let selectedOptionIndex = optionsMenu.selectedIndex;
                let selectedOptionText =
                  optionsMenu.options[selectedOptionIndex].text;
                let selectedOptionValue =
                  optionsMenu.options[selectedOptionIndex].value;
                optionsMenu.remove(selectedOptionIndex);
                let newOption = document.createElement("option");
                newOption.innerHTML = selectedOptionText;
                newOption.value = selectedOptionValue;
                optionsMenu.insertBefore(newOption, optionsMenu.firstChild);
                optionsMenu.value = selectedOptionValue;

                let newName = selectedOptionValue;
                let newNameRes = await axios.get(
                  `https://pokeapi.co/api/v2/pokemon/${newName}`
                );
                document.getElementById("artCanvas").classList.toggle("shine");
                setTimeout(() => {
                  document
                    .getElementById("artCanvas")
                    .classList.toggle("shine");
                }, 6000);
                setTimeout(() => {
                  if (shiny === true) {
                    setImg(newNameRes.data.sprites.front_shiny);
                    setURL(
                      newNameRes.data.sprites.other["official-artwork"]
                        .front_shiny
                    );
                  } else {
                    setImg(newNameRes.data.sprites.front_default);
                    setURL(
                      newNameRes.data.sprites.other["official-artwork"]
                        .front_default
                    );
                  }
                  document.querySelector(
                    "#pkmnInfo #types #primaryType"
                  ).innerHTML =
                    newNameRes.data.types[0].type.name.charAt(0).toUpperCase() +
                    newNameRes.data.types[0].type.name.slice(1);
                  if (newNameRes.data.types.length > 1) {
                    document
                      .querySelector("#pkmnInfo #types")
                      .classList.remove("singleType");
                    document.querySelector(
                      "#pkmnInfo #types #secondaryType"
                    ).innerHTML =
                      newNameRes.data.types[1].type.name
                        .charAt(0)
                        .toUpperCase() +
                      newNameRes.data.types[1].type.name.slice(1);
                  } else {
                    document
                      .querySelector("#pkmnInfo #types")
                      .classList.add("singleType");
                  }
                  setIsLoading(false);
                }, 4000);
              };
              for (let i = 0; i < evoRes.data.varieties.length; i++) {
                let option = document.createElement("option");
                if (evoRes.data.varieties[i].is_default) {
                  option.innerHTML = "Default form";
                  option.value = evoRes.data.varieties[i].pokemon.name;
                } else {
                  let optionName = evoRes.data.varieties[i].pokemon.name;
                  optionName = optionName.replace(nameValue, "");
                  optionName = optionName.replace("-", "");
                  optionName =
                    optionName.charAt(0).toUpperCase() + optionName.slice(1);
                  optionName = optionName + " Form";
                  option.innerHTML = optionName;
                  option.value = evoRes.data.varieties[i].pokemon.name;
                }
                optionsMenu.appendChild(option);
              }
              document.getElementById("buttons").appendChild(optionsMenu);
            }
          } catch (err) {
            console.log(err);
          }

          let evoData;

          try {
            try {
              let evoChain = await axios.get(evoRes.data.evolution_chain.url);
              console.log(evoChain);
              let stageNumber = 1;

              if (evoChain.data.chain.evolves_to.length !== 0) {
                // This check eliminates single-stage mons

                evoData = evoChain.data.chain.evolves_to[0].species.name;

                // This check determines the length of the evolution family
                if (evoChain.data.chain.evolves_to[0].evolves_to.length === 0) {
                  stageNumber = 2;
                } else {
                  stageNumber = 3;
                }
                let randInt = 0;
                switch (stageNumber) {
                  case 2:
                    if (nameValue !== evoChain.data.chain.species.name) {
                      console.log("This mon is the final stage of a 2-stager");
                      evoBtnCheck = false;
                    } else {
                      console.log("This mon is the 1st stage of a 2-stager");
                      evoBtnCheck = true;
                      // Check for branch-evos
                      if (evoChain.data.chain.evolves_to.length > 1) {
                        randInt = Math.floor(
                          Math.random() * evoChain.data.chain.evolves_to.length
                        );
                        evoData =
                          evoChain.data.chain.evolves_to[randInt].species.name;
                      }
                      evoData =
                        evoChain.data.chain.evolves_to[randInt].species.name;
                    }
                    break;
                  case 3:
                    if (
                      nameValue !== "cascoon" &&
                      nameValue !== evoData &&
                      nameValue !== evoChain.data.chain.species.name
                    ) {
                      // This check eliminates mons that are final stages
                      console.log("This mon is the final stage of a 3-stager");
                      evoBtnCheck = false;
                      if (
                        typeof document.getElementById("evoBtn") !==
                          "undefined" &&
                        document.getElementById("evoBtn") !== null
                      ) {
                        document.getElementById("evoBtn").remove();
                        break;
                      }
                    } else if (
                      nameValue === evoData &&
                      nameValue !== evoChain.data.chain.species.name
                    ) {
                      console.log("This mon is the middle stage of a 3-stager");
                      evoBtnCheck = true;
                      // Check for branch-evos
                      let randInt = 0;
                      if (
                        evoChain.data.chain.evolves_to[0].evolves_to.length > 1
                      ) {
                        randInt = Math.floor(
                          Math.random() *
                            evoChain.data.chain.evolves_to[0].evolves_to.length
                        );
                        evoData =
                          evoChain.data.chain.evolves_to[0].evolves_to[randInt]
                            .species.name;
                      }
                      evoData =
                        evoChain.data.chain.evolves_to[0].evolves_to[randInt]
                          .species.name;
                    } else if (nameValue === "cascoon") {
                      evoBtnCheck = true;
                      evoData = "dustox";
                    } else {
                      console.log("This mon is the 1st stage of a 3-stager");
                      evoBtnCheck = true;
                      // Check for branch-evos
                      let randInt = 0;
                      if (evoChain.data.chain.evolves_to.length > 1) {
                        randInt = Math.floor(
                          Math.random() * evoChain.data.chain.evolves_to.length
                        );
                        console.log(randInt);
                        evoData =
                          evoChain.data.chain.evolves_to[randInt].species.name;
                      }
                      evoData =
                        evoChain.data.chain.evolves_to[randInt].species.name;
                    }
                    break;
                  default:
                    console.log("This mon is a single-stager");
                    evoBtnCheck = false;
                }
              } else {
                // Either remove or simply not put the evoBtn there
                if (nameValue === "qwilfish") {
                  evoData = "overqwil";
                  evoBtnCheck = true;
                } else if (nameValue === "stantler") {
                  evoData = "wyrdeer";
                  evoBtnCheck = true;
                } else if (
                  nameValue === "basculin-red-striped" ||
                  nameValue === "basculin-blue-striped" ||
                  nameValue === "basculin-white-striped"
                ) {
                  console.log("!!!");
                  evoData = "basculegion-male";
                  evoBtnCheck = true;
                } else {
                  evoBtnCheck = false;
                }
                if (
                  typeof document.getElementById("evoBtn") !== "undefined" &&
                  document.getElementById("evoBtn") !== null
                ) {
                  document.getElementById("evoBtn").remove();
                }
              }
            } catch (err) {
              try {
                evoData = await axios.get(
                  evoRes.data.evolves_from_species.name
                );
              } catch (err) {
                console.log(err);
              }
              evoBtnCheck = false;
            }

            if (evoBtnCheck) {
              // Only create evoBtn if all conditions are right
              let evoBtn = document.createElement("button");
              evoBtn.innerHTML = "Evolve!";
              evoBtn.id = "evoBtn";

              evoBtn.onclick = () => {
                // Check for branch-evos
                setIsLoading(true);
                document.getElementById("artCanvas").classList.toggle("shine");
                setTimeout(() => {
                  document
                    .getElementById("artCanvas")
                    .classList.toggle("shine");
                }, 6000);

                setTimeout(() => {
                  setStateFind(evoData);
                }, 3000);
              };
              evoBtn.classList.toggle("noSelect");
              document.getElementById("buttons").appendChild(evoBtn);
            }
          } catch (err) {
            console.log(err);
          }

          // if (megaEvoBtnToggle) {
          //   if (shiny === true) {
          //     setImg(megaEvoRes.data.sprites.front_shiny);
          //   } else {
          //     setImg(megaEvoRes.data.sprites.front_default);
          //   }
          // } else {
          if (shiny === true) {
            if (res.data.sprites.front_shiny) {
              setImg(res.data.sprites.front_shiny);
            } else {
              setImg(res.data.sprites.other["official-artwork"].front_shiny);
            }
          } else {
            // if (res.data.id < 906) {
            setImg(res.data.sprites.front_default);
            // } else {
            //   setImg(res.data.sprites.other["official-artwork"].front_default);
            // }
          }
          // }

          if (shiny) {
            console.log(numValue, typeof numValue);
            let shinyURL =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/" +
              numValue +
              ".png";
            console.log(shinyURL);
            if (res.data.sprites.other["official-artwork"].front_shiny) {
              setURL(shinyURL);
            } else {
              setURL(res.data.sprites.other["official-artwork"].front_default);
            }
          } else {
            setURL(res.data.sprites.other["official-artwork"].front_default);
          }
          const filteredGenera = evoRes.data.genera
            .filter((item) => item.language.name === "en")
            .map((item) => item.genus);
          setType(
            filteredGenera[0]
              ? "The " + filteredGenera[0]
              : "The Unknown Pokemon"
          );
          setStateFind(res.data.name);
          setNumValue(res.data.id);
        } catch (err) {
          console.log(err);
        }
      }
      setIsLoading(false);
    }

    getData();
  }, [nameValue, shiny, numValue]);

  const increase = () => {
    setIsLoading(true);
    numValue = numValue + 1;
    setNumValue(numValue);
    setStateFind(numValue.toString());
  };

  const decrease = () => {
    setIsLoading(true);
    numValue = numValue - 1;
    setNumValue(numValue);
    setStateFind(numValue.toString());
  };

  useEffect(() => {
    const myCanvas = document.getElementById("my-canvas");
    const imgData = document.getElementById("imgData");
    const myContext = myCanvas.getContext("2d");
    const img = new Image();
    myCanvas.willReadFrequently = true;
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
      delete counts["#0f110d"];
      delete counts["#e8e8e8"];
      delete counts["#020501"];
      delete counts["#050505"];
      delete counts["#060606"];
      delete counts["#070707"];
      //For Koraidon specifically
      delete counts["#a39698"];
      delete counts["#656068"];
      delete counts["#edebe6"];

      let colorScheme = Object.entries(counts);
      let sortedScheme = colorScheme.sort((a, b) => a[1] - b[1]).reverse();

      color2 = sortedScheme[0][0];
      color3 = sortedScheme[1][0];
      color4 = sortedScheme[2][0];
      color5 = sortedScheme[3][0];
      color6 = sortedScheme[4][0];
      color7 = sortedScheme[5][0];
      color8 = sortedScheme[6][0];
      color9 = sortedScheme[7][0];
      color10 = sortedScheme[8][0];

      //convert hex to rgb:
      function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
      }

      let color_list = {
        color2: color2,
        color3: color3,
        color4: color4,
        color5: color5,
        color6: color6,
        color7: color7,
        color8: color8,
        color9: color9,
        color10: color10,
      };
      let hsp_list = [
        "--hsp2",
        "--hsp3",
        "--hsp4",
        "--hsp5",
        "--hsp6",
        "--hsp7",
        "--hsp8",
        "--hsp9",
        "--hsp10",
      ];
      let anti_hsp_list = [
        "--anti_hsp2",
        "--anti_hsp3",
        "--anti_hsp4",
        "--anti_hsp5",
        "--anti_hsp6",
        "--anti_hsp7",
        "--anti_hsp8",
        "--anti_hsp9",
        "--anti_hsp10",
      ];
      let root = document.querySelector(":root");

      let i = 0;
      for (const [key, value] of Object.entries(color_list)) {
        if (hsp(value.toUpperCase()) > 150) {
          root.style.setProperty(hsp_list[i], "#121212");
          root.style.setProperty(anti_hsp_list[i], "#f1f1f1");
        } else {
          root.style.setProperty(hsp_list[i], "#f1f1f1");
          root.style.setProperty(anti_hsp_list[i], "#121212");
        }
        i++;
      }

      let fullArtURL = "url('" + artURL + "')";

      root.style.setProperty("--color2", color2);
      root.style.setProperty("--color3", color3);
      root.style.setProperty("--color4", color4);
      root.style.setProperty("--color5", color5);
      root.style.setProperty("--color6", color6);
      root.style.setProperty("--color7", color7);
      root.style.setProperty("--color8", color8);
      root.style.setProperty("--color9", color9);
      root.style.setProperty("--color10", color10);

      root.style.setProperty("--color2word", `"${color2.toUpperCase()}"`);
      root.style.setProperty("--color3word", `"${color3.toUpperCase()}"`);
      root.style.setProperty("--color4word", `"${color4.toUpperCase()}"`);
      root.style.setProperty("--color5word", `"${color5.toUpperCase()}"`);
      root.style.setProperty("--color6word", `"${color6.toUpperCase()}"`);
      root.style.setProperty("--color7word", `"${color7.toUpperCase()}"`);
      root.style.setProperty("--color8word", `"${color8.toUpperCase()}"`);
      root.style.setProperty("--color9word", `"${color9.toUpperCase()}"`);
      root.style.setProperty("--color10word", `"${color10.toUpperCase()}"`);

      root.style.setProperty("--artURL", fullArtURL);
      root.style.setProperty("--pkmnInfoBg", pkmnInfoBg);

      const colorEmojiArr = [
        { color: "red", emoji: "🟥" },
        { color: "orange", emoji: "🟧" },
        { color: "yellow", emoji: "🟨" },
        { color: "green", emoji: "🟩" },
        { color: "blue", emoji: "🟦" },
        { color: "purple", emoji: "🟪" },
        { color: "pink", emoji: "🟪" },
        { color: "brown", emoji: "🟫" },
        { color: "white", emoji: "⬜" },
        { color: "black", emoji: "⬛" },
        { color: "gray", emoji: "⬛" },
      ];

      if (!isLoading) {
        document.querySelector(
          "#shareWidgets .tweet-input"
        ).value = `I generated ${
          evoRes.data.names
            .filter((item) => item.language.name === "en")
            .map((item) => item.name)[0]
            .charAt(0)
            .toUpperCase() + nameValue.slice(1)
        }'s color palette using PokePalette! 🎨${colorEmojiArr
          .filter((item) => item.color === evoRes.data.color.name)
          .map((item) => item.emoji)}

        ${color2.toUpperCase().slice(1)}
        ${color3.toUpperCase().slice(1)}
        ${color4.toUpperCase().slice(1)}
        \npokemonpalette.com`;

        document.querySelector(".pokeName").innerHTML =
          (nameValue.charAt(0) === "a" ||
          nameValue.charAt(0) === "e" ||
          nameValue.charAt(0) === "o" ||
          nameValue.charAt(0) === "i" ||
          nameValue.charAt(0) === "u"
            ? "an "
            : "a ") +
          nameValue.charAt(0).toUpperCase() +
          nameValue.slice(1);

        document.querySelector("#pkmnInfo h2").innerHTML =
          nameValue.charAt(0).toUpperCase() +
          nameValue.slice(1) +
          ` [#${numValue}]`;
        document.querySelector("#pkmnInfo #types #primaryType").innerHTML =
          resCopy.data.types[0].type.name.charAt(0).toUpperCase() +
          resCopy.data.types[0].type.name.slice(1);
        if (resCopy.data.types.length > 1) {
          document
            .querySelector("#pkmnInfo #types")
            .classList.remove("singleType");
          document.querySelector("#pkmnInfo #types #secondaryType").innerHTML =
            resCopy.data.types[1].type.name.charAt(0).toUpperCase() +
            resCopy.data.types[1].type.name.slice(1);
        } else {
          document
            .querySelector("#pkmnInfo #types")
            .classList.add("singleType");
        }
        try {
          console.log(evoRes);
          let habitat = "";
          if (evoRes.data.habitat !== null) {
            habitat =
              "Habitat: " +
              evoRes.data.habitat.name.charAt(0).toUpperCase() +
              evoRes.data.habitat.name.slice(1) +
              "<br><br>";
          }
          let generation = "";
          generation =
            evoRes.data.generation.name.replace(
              /generation-(\w+)/i,
              (match, p1) => {
                const romanNumeral = p1.toUpperCase();
                return `Generation: ${romanNumeral}`;
              }
            ) + "<br><br>";
          document.querySelector("#pkmnInfo .description").innerHTML =
            generation +
            habitat +
            evoRes.data.flavor_text_entries
              .filter((item) => item.language.name === "en")
              .slice(-1)
              .map((item) => item.flavor_text);
        } catch (err) {
          console.log(err);
        }
      } else {
        document.querySelector(
          "#shareWidgets .tweet-input"
        ).value = `Loading...`;

        document.querySelector("#pkmnInfo h2").innerHTML = `Loading...`;
        document.querySelector("#pkmnInfo #types #primaryType").innerHTML = ``;
        document.querySelector(
          "#pkmnInfo #types #secondaryType"
        ).innerHTML = ``;
        document.querySelector(
          "#pkmnInfo .description"
        ).innerHTML = `Loading...`;
      }
    };
  });

  function hsp(color) {
    color = color.slice(1, 7);
    let rgb = [];
    for (let i = 0; i < color.length; i = i + 2) {
      let rgb_value1 = parseInt(color[i], 16) * 16;
      let rgb_value2 = parseInt(color[i + 1], 16);
      let rgb_value_full = rgb_value1 + rgb_value2;
      rgb.push(rgb_value_full);
    }

    let hsp = Math.sqrt(
      0.299 * (rgb[0] * rgb[0]) +
        0.587 * (rgb[1] * rgb[1]) +
        0.114 * (rgb[2] * rgb[2])
    );
    return hsp;
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="pokeCard">
      {isLoading ? <div id="hideWhileLoading"></div> : null}
      <div id="colorBg">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <canvas
        id="my-canvas"
        width="100px"
        height="100px"
        willReadFrequently="true"
      ></canvas>

      <img
        style={{ display: "none", width: "100px", height: "100px" }}
        id="imgData"
        crossOrigin="Anonymous"
        src={`${Img}`}
        alt=""
      />

      <div className="type">{Type}</div>

      <div className="labelInput">
        <label htmlFor="name">
          <em>Name:</em>
        </label>
        <input
          type="text"
          id="nameInput"
          onChange={NameChanger}
          value={nameValue}
          name="name"
          spellcheck="false"
          autocomplete="off"
          //override down arrow action so you can choose from suggestions with keyboard
          onKeyDown={(e) => {
            if (e.keyCode === 40 && suggestions.length > 0) {
              e.preventDefault();
              console.log("down");
              document.querySelector("#suggestions button").focus();
            }
          }}
          // onBlur={() => {
          //     setSuggestions([]);
          // }}
        />
        <button
          id="shinyBtn"
          onClick={ShinyChange}
          aria-label="Shiny toggle Button"
          className={"noSelect" + (shiny ? " shiny" : "")}
        >
          {shiny ? <IoSparkles /> : <IoSparklesOutline />}
        </button>
        <div id="suggestionsWrapper" className={suggestions.length > 0 ? "" : "empty"}>
          <div id="suggestions">
            {suggestions.map((item, index) => {
              return (
                <button
                  className="suggestion"
                  key={index}
                  onClick={() => {
                    setIsLoading(true);
                    setStateFind(speciesData[item].toString());
                    setSuggestions([]);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 40) {
                      e.preventDefault();
                      console.log("down");
                      // select the next one
                      if (index < suggestions.length - 1) {
                        document
                          .querySelectorAll(".suggestion")
                          [index + 1].focus();
                      }
                    } else if (e.keyCode === 38) {
                      e.preventDefault();
                      console.log("up");
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
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                          speciesData[item] +
                          ".png" 
                          || ""
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

      {isLoading ? (
        <div
          style={{ margin: 0, color: "var(--hsp3)", minHeight: "1.2rem" }}
          className="loading"
        >
          <RiLoader4Fill />
        </div>
      ) : (
        <em style={{ margin: 0, color: "var(--hsp3)", minHeight: "1.2rem" }}>
          {shiny ? "Shiny mode" : ""}
        </em>
      )}

      <div id="numLine">
        <button className="noSelect" onClick={decrease} aria-label="Arrow Down">
          <p>
            <BsArrowDownSquareFill size={30} />
          </p>
        </button>
        <div className="labelInput">
          <label htmlFor="number">
            <em>National Dex No:</em>
          </label>
          <input
            type="number"
            id="numInput"
            step="1"
            max="10250"
            min="1"
            onChange={NumChanger}
            value={numValue}
            name="number"
          />
        </div>

        <button className="noSelect" onClick={increase} aria-label="Arrow Up">
          <p>
            <BsArrowUpSquareFill size={30} />
          </p>
        </button>
      </div>

      <div id="buttons">
        <button id="randomBtn" onClick={Randomize} className="noSelect">
          Randomize
        </button>
      </div>
      <img src={artURL} style={{ display: "none" }} alt="hiddenPokemon" />
    </div>
  );
}
