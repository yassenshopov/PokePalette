import React, { useState, useEffect } from "react";
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from "react-icons/bs";
import { IoSparkles, IoSparklesOutline } from "react-icons/io5";
import { RiLoader4Fill } from "react-icons/ri";
import axios from "axios";

let color2, color3, color4, color5, color6, color7, color8, color9, color10;

export default function Poke() {
  let [nameValue, setStateFind] = useState("flygon");
  let [numValue, setNumValue] = useState(330);

  const NumChanger = (e) => {
    setIsLoading(true);
    setNumValue(e.target.value);
    setStateFind(e.target.value);
  };

  const NameChanger = (e) => {
    setIsLoading(true);
    setStateFind(e.target.value);
  };

  let [shiny, setShiny] = useState(false);
  let [random, setRandom] = useState(45);

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
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/330.png"
  );
  const [Type, setType] = useState("");
  let megaEvoRes;
  let megaEvoBtnToggle;

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${nameValue.toLowerCase()}`
        );
        console.log(res);
        let evoBtnCheck = true;
        let megaEvoList = [
          "venusaur",
          "charizard",
          "blastoise",
          "alakazam",
          "gengar",
          "kangaskhan",
          "pinsir",
          "gyarados",
          "aerodactyl",
          "mewtwo",
          "ampharos",
          "scizor",
          "heracross",
          "houndoom",
          "tyranitar",
          "blaziken",
          "gardevoir",
          "mawile",
          "aggron",
          "medicham",
          "manectric",
          "banette",
          "absol",
          "latias",
          "latios",
          "garchomp",
          "lucario",
          "abomasnow",
          "beedrill",
          "pidgeot",
          "slowbro",
          "steelix",
          "sceptile",
          "swampert",
          "sableye",
          "sharpedo",
          "camerupt",
          "altaria",
          "glalie",
          "salamence",
          "metagross",
          "rayquaza",
          "lopunny",
          "gallade",
          "audino",
          "diancie",
        ];
        let alolaList = [
          "rattata",
          "raticate",
          "raichu",
          "sandshrew",
          "sandslash",
          "vulpix",
          "ninetales",
          "diglett",
          "dugtrio",
          "meowth",
          "persian",
          "geodude",
          "graveler",
          "golem",
          "grimer",
          "muk",
          "exeggutor",
          "marowak",
        ];
        let galarList = [
          "meowth",
          "ponyta",
          "rapidash",
          "slowpoke",
          "slowbro",
          "farfetchd",
          "weezing",
          "mr-mime",
          "articuno",
          "zapdos",
          "moltres",
          "slowking",
          "corsola",
          "zigzagoon",
          "linoone",
          "darumaka",
          "darmanitan",
          "yamask",
          "stunfisk",
        ];
        let hisuiList = [
          "growlithe",
          "arcanine",
          "voltorb",
          "electrode",
          "typhlosion",
          "qwilfish",
          "sneasel",
          "samurott",
          "lilligant",
          "zorua",
          "zoroark",
          "braviary",
          "sliggoo",
          "goodra",
          "avalugg",
          "decidueye",
        ];
        let gmaxList = [
          "charizard",
          "butterfree",
          "pikachu",
          "meowth",
          "machamp",
          "gengar",
          "kingler",
          "lapras",
          "eevee",
          "snorlax",
          "garbodor",
          "melmetal",
          "corviknight",
          "orbeetle",
          "drednaw",
          "coalossal",
          "flapple",
          "appletun",
          "sandaconda",
          "toxtricity",
          "centiskorch",
          "hatterene",
          "grimmsnarl",
          "alcremie",
          "copperajah",
          "duraludon",
        ];

        // Compulsory clean-up: this removes old data from the evoBtn and sets the stage for a new one

        if (
          typeof document.getElementById("evoBtn") != "undefined" &&
          document.getElementById("evoBtn") != null
        ) {
          document.getElementById("evoBtn").remove();
        }

        if (
          typeof document.getElementById("alolaBtn") != "undefined" &&
          document.getElementById("alolaBtn") != null
        ) {
          document.getElementById("alolaBtn").remove();
        }

        if (
          typeof document.getElementById("galarBtn") != "undefined" &&
          document.getElementById("galarBtn") != null
        ) {
          document.getElementById("galarBtn").remove();
        }

        if (
          typeof document.getElementById("hisuiBtn") != "undefined" &&
          document.getElementById("hisuiBtn") != null
        ) {
          document.getElementById("hisuiBtn").remove();
        }

        if (
          typeof document.getElementById("gmaxBtn") != "undefined" &&
          document.getElementById("gmaxBtn") != null
        ) {
          document.getElementById("gmaxBtn").remove();
        }

        let evoRes;
        try {
          evoRes = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${nameValue.toLowerCase()}`
          );
          console.log(evoRes);
        } catch (err) {
          switch (nameValue.toLocaleLowerCase()) {
            case "basculin-red-striped":
              evoRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/basculin`
              );
            case "basculin-blue-striped":
              evoRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/basculin`
              );
            case "basculin-white-striped":
              evoRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/basculin`
              );
          }
          console.log(err);
        }

        let evoData;

        if (alolaList.includes(nameValue)) {
          let alolaBtn = document.createElement("button");
          alolaBtn.innerHTML = "Alola Form ☀️";
          alolaBtn.id = "alolaBtn";

          let alolaBtnToggle = true;
          alolaBtn.onclick = async () => {
            if (alolaBtnToggle) {
              let alola = nameValue + "-alola";
              let alolaRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${alola}`
              );

              if (shiny === true) {
                setImg(alolaRes.data.sprites.front_shiny);
              } else {
                setImg(alolaRes.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("spin");
              setTimeout(() => {
                document.getElementById("artCanvas").classList.toggle("spin");
              }, 6000);
              setTimeout(() => {
                setURL(
                  alolaRes.data.sprites.other["official-artwork"].front_default
                );
              }, 3000);
              alolaBtn.innerHTML = "↩️";
            } else {
              if (shiny === true) {
                setImg(res.data.sprites.front_shiny);
              } else {
                setImg(res.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("deshine");
              setTimeout(() => {
                document
                  .getElementById("artCanvas")
                  .classList.toggle("deshine");
              }, 2000);
              setTimeout(() => {
                setURL(
                  res.data.sprites.other["official-artwork"].front_default
                );
              }, 500);
              alolaBtn.innerHTML = "Alola Form ☀️";
            }
            alolaBtnToggle = !alolaBtnToggle;
          };
          alolaBtn.classList.toggle("noSelect");
          document.getElementById("buttons").appendChild(alolaBtn);
        }

        if (galarList.includes(nameValue)) {
          let galarBtn = document.createElement("button");
          galarBtn.innerHTML = "Galar Form 🏙️";
          galarBtn.id = "galarBtn";

          let galarBtnToggle = true;
          galarBtn.onclick = async () => {
            if (galarBtnToggle) {
              let galar = nameValue + "-galar";
              let galarRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${galar}`
              );

              if (shiny === true) {
                setImg(galarRes.data.sprites.front_shiny);
              } else {
                setImg(galarRes.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("spin");
              setTimeout(() => {
                document.getElementById("artCanvas").classList.toggle("spin");
              }, 6000);
              setTimeout(() => {
                setURL(
                  galarRes.data.sprites.other["official-artwork"].front_default
                );
              }, 3000);
              galarBtn.innerHTML = "↩️";
            } else {
              if (shiny === true) {
                setImg(res.data.sprites.front_shiny);
              } else {
                setImg(res.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("deshine");
              setTimeout(() => {
                document
                  .getElementById("artCanvas")
                  .classList.toggle("deshine");
              }, 2000);
              setTimeout(() => {
                setURL(
                  res.data.sprites.other["official-artwork"].front_default
                );
              }, 500);
              galarBtn.innerHTML = "Galar Form 🏙️";
            }
            galarBtnToggle = !galarBtnToggle;
          };
          galarBtn.classList.toggle("noSelect");
          document.getElementById("buttons").appendChild(galarBtn);
        }

        if (hisuiList.includes(nameValue)) {
          let hisuiBtn = document.createElement("button");
          hisuiBtn.innerHTML = "Hisui Form ⛰️";
          hisuiBtn.id = "hisuiBtn";

          let hisuiBtnToggle = true;
          hisuiBtn.onclick = async () => {
            if (hisuiBtnToggle) {
              let hisui = nameValue + "-hisui";
              let hisuiRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${hisui}`
              );

              if (shiny === true) {
                setImg(hisuiRes.data.sprites.front_shiny);
              } else {
                setImg(hisuiRes.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("shine");
              setTimeout(() => {
                document.getElementById("artCanvas").classList.toggle("shine");
              }, 6000);
              setTimeout(() => {
                setURL(
                  hisuiRes.data.sprites.other["official-artwork"].front_default
                );
              }, 3000);
              hisuiBtn.innerHTML = "↩️";
            } else {
              if (shiny === true) {
                setImg(res.data.sprites.front_shiny);
              } else {
                setImg(res.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("deshine");
              setTimeout(() => {
                document
                  .getElementById("artCanvas")
                  .classList.toggle("deshine");
              }, 2000);
              setTimeout(() => {
                setURL(
                  res.data.sprites.other["official-artwork"].front_default
                );
              }, 500);
              hisuiBtn.innerHTML = "Hisui Form ⛰️";
            }
            hisuiBtnToggle = !hisuiBtnToggle;
          };
          hisuiBtn.classList.toggle("noSelect");
          document.getElementById("buttons").appendChild(hisuiBtn);
        }

        if (gmaxList.includes(nameValue)) {
          let gmaxBtn = document.createElement("button");
          gmaxBtn.innerHTML = "Gigantamax 🚀";
          gmaxBtn.id = "gmaxBtn";

          let gmaxBtnToggle = true;
          gmaxBtn.onclick = async () => {
            if (gmaxBtnToggle) {
              let gmax = nameValue + "-gmax";
              let gmaxRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${gmax}`
              );

              if (shiny === true) {
                setImg(gmaxRes.data.sprites.front_shiny);
              } else {
                setImg(gmaxRes.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("shine");
              setTimeout(() => {
                document.getElementById("artCanvas").classList.toggle("shine");
              }, 6000);
              setTimeout(() => {
                setURL(
                  gmaxRes.data.sprites.other["official-artwork"].front_default
                );
              }, 3000);
              gmaxBtn.innerHTML = "↩️";
            } else {
              if (shiny === true) {
                setImg(res.data.sprites.front_shiny);
              } else {
                setImg(res.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("deshine");
              setTimeout(() => {
                document
                  .getElementById("artCanvas")
                  .classList.toggle("deshine");
              }, 2000);
              setTimeout(() => {
                setURL(
                  res.data.sprites.other["official-artwork"].front_default
                );
              }, 500);
              gmaxBtn.innerHTML = "Gigantamax 🚀";
            }
            gmaxBtnToggle = !gmaxBtnToggle;
          };
          gmaxBtn.classList.toggle("noSelect");
          document.getElementById("buttons").appendChild(gmaxBtn);
        }

        if (megaEvoList.includes(nameValue)) {
          evoBtnCheck = false;

          let megaEvoBtn = document.createElement("button");
          megaEvoBtn.innerHTML = "Mega Evolve! ✨";
          megaEvoBtn.id = "evoBtn";

          let megaEvoBtnToggle = true;
          megaEvoBtn.onclick = async () => {
            if (megaEvoBtnToggle) {
              let megaEvo;
              let megaXY = ["x", "y"];
              if (nameValue === "charizard" || nameValue === "mewtwo") {
                let randInt = Math.floor(Math.random() * 2);
                megaEvo = nameValue + "-mega-" + megaXY[randInt];
              } else {
                megaEvo = nameValue + "-mega";
              }

              megaEvoRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${megaEvo}`
              );

              if (shiny === true) {
                setImg(megaEvoRes.data.sprites.front_shiny);
              } else {
                setImg(megaEvoRes.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("shine");
              setTimeout(() => {
                document.getElementById("artCanvas").classList.toggle("shine");
              }, 6000);
              setTimeout(() => {
                setURL(
                  megaEvoRes.data.sprites.other["official-artwork"]
                    .front_default
                );
              }, 3000);
              megaEvoBtn.innerHTML = "↩️";
            } else {
              if (shiny === true) {
                setImg(res.data.sprites.front_shiny);
              } else {
                setImg(res.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("deshine");
              setTimeout(() => {
                document
                  .getElementById("artCanvas")
                  .classList.toggle("deshine");
              }, 2000);
              setTimeout(() => {
                setURL(
                  res.data.sprites.other["official-artwork"].front_default
                );
              }, 500);
              megaEvoBtn.innerHTML = "Mega Evolve! ✨";
            }
            megaEvoBtnToggle = !megaEvoBtnToggle;
          };
          megaEvoBtn.classList.toggle("noSelect");
          document.getElementById("buttons").appendChild(megaEvoBtn);
        } else {
          try {
            try {
              let evoChain = await axios.get(evoRes.data.evolution_chain.url);

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
                      if (nameValue === "ursaring") {
                        evoData = "ursaluna";
                        evoBtnCheck = true;
                      } else {
                        console.log(
                          "This mon is the final stage of a 2-stager"
                        );
                        evoBtnCheck = false;
                      }
                    } else {
                      if (nameValue === "sneasel") {
                        evoData = ["weavile", "sneasler"];
                        randInt = Math.floor(Math.random() * evoData.length);
                        evoData = evoData[randInt];
                        evoBtnCheck = true;
                      } else if (nameValue === "scyther") {
                        evoData = ["scizor", "kleavor"];
                        randInt = Math.floor(Math.random() * evoData.length);
                        evoData = evoData[randInt];
                        evoBtnCheck = true;
                      } else {
                        console.log("This mon is the 1st stage of a 2-stager");
                        evoBtnCheck = true;
                        // Check for branch-evos
                        if (evoChain.data.chain.evolves_to.length > 1) {
                          randInt = Math.floor(
                            Math.random() *
                              evoChain.data.chain.evolves_to.length
                          );
                          evoData =
                            evoChain.data.chain.evolves_to[randInt].species
                              .name;
                        }
                        evoData =
                          evoChain.data.chain.evolves_to[randInt].species.name;
                      }
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
        }

        if (megaEvoBtnToggle) {
          if (shiny === true) {
            setImg(megaEvoRes.data.sprites.front_shiny);
          } else {
            setImg(megaEvoRes.data.sprites.front_default);
          }
        } else {
          if (shiny === true) {
            if (res.data.id < 906) {
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
        }

        if (shiny) {
          console.log(numValue, typeof numValue);
          let shinyURL =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/" +
            numValue +
            ".png";
          console.log(shinyURL);
          setURL(shinyURL);
        } else {
          setURL(res.data.sprites.other["official-artwork"].front_default);
        }
        const filteredGenera = evoRes.data.genera
          .filter((item) => item.language.name === "en")
          .map((item) => item.genus);
        setType("The " + filteredGenera[0]);
        setStateFind(res.data.name);
        setNumValue(res.data.id);
      } catch (err) {
        console.log(err);
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
    const container = document.querySelector(".pokeCard");
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
      //For Koraidon specifically
      delete counts["#a39698"];
      delete counts["#656068"];
      delete counts["#edebe6"];

      let colorScheme = Object.entries(counts);
      let sortedScheme = colorScheme.sort((a, b) => a[1] - b[1]).reverse();

      // let bgStr =
      //   'linear-gradient(-5deg,' +
      //   sortedScheme[2][0] +
      //   ' 0%,' +
      //   sortedScheme[2][0] +
      //   ' 20%,' +
      //   sortedScheme[1][0] +
      //   ' 20%,' +
      //   sortedScheme[1][0] +
      //   ' 80%,' +
      //   sortedScheme[0][0] +
      //   ' 80%,' +
      //   sortedScheme[0][0] +
      //   ' 100%)';
      // container.style.background = bgStr;

      // console.log(sortedScheme)

      color2 = sortedScheme[0][0];
      color3 = sortedScheme[1][0];
      color4 = sortedScheme[2][0];
      color5 = sortedScheme[3][0];
      color6 = sortedScheme[4][0];
      color7 = sortedScheme[5][0];
      color8 = sortedScheme[6][0];
      color9 = sortedScheme[7][0];
      color10 = sortedScheme[8][0];

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
        // console.log(key, value)
        if (hsp(value.toUpperCase()) > 150) {
          root.style.setProperty(hsp_list[i], "#121212");
          root.style.setProperty(anti_hsp_list[i], "#f1f1f1");
        } else {
          root.style.setProperty(hsp_list[i], "#f1f1f1");
          root.style.setProperty(anti_hsp_list[i], "#121212");
        }
        document.getElementsByClassName(key);
        for (let j = 0; j < document.getElementsByClassName(key).length; j++) {
          document.getElementsByClassName(key)[j].innerHTML =
            value.toUpperCase();
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

      root.style.setProperty("--artURL", fullArtURL);
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

  // let body = document.querySelector("body");
  // body.addEventListener('keydown', (e) => {
  //   console.log(e)
  //   if (e.key == "ArrowUp") {
  //     increase();
  //   } else if (e.key == "ArrowDown") {
  //     decrease();
  //   }
  // })

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="pokeCard">
      {isLoading ? <div id="hideWhileLoading"></div> : null}
      <div id="colorBg">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <canvas id="my-canvas" width="100px" height="100px"></canvas>

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
        />
        <button
          id="shinyBtn"
          onClick={ShinyChange}
          aria-label="Shiny toggle Button"
          className={"noSelect" + (shiny ? " shiny" : "")}
        >
          {shiny ? <IoSparkles /> : <IoSparklesOutline />}
        </button>
      </div>

      {isLoading ? (
        <div
          style={{ margin: 0, color: "var(--hsp3)", minHeight: "1.2rem" }}
          className="loading"
        >
          <RiLoader4Fill />
        </div>
      ) : (
        <em>{shiny ? "Shiny mode" : ""}</em>
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
      <img src={artURL} style={{ display: "none" }} />
    </div>
  );
}
