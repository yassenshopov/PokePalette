import React, { useState, useEffect } from 'react';
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from 'react-icons/bs';
import axios from 'axios';

let shiny = false;
let randomSwitch = false;

let color2, color3, color4;
let artURL;

export default function Poke() {
  let [nameValue, setStateFind] = useState('wooper');
  let [numValue, setNumValue] = useState(81);

  const NumChanger = (e) => {
    setNumValue(e.target.value);
    setStateFind(e.target.value);
  };

  const NameChanger = (e) => {
    setStateFind(e.target.value);
  };

  let [shiny, setShiny] = useState(false);
  let [random, setRandom] = useState(81);

  const ShinyChange = () => {
    setShiny(!shiny);
  };

  const Randomize = () => {
    let random = 1 + Math.floor(Math.random() * 905);
    setRandom(random);
    random = random.toString();
    setStateFind(random);
  };

  let [Img, setImg] = useState('');
  let [artURL, setURL] = useState(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png'
  );
  const [Type, setType] = useState('');
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
          'venusaur',
          'charizard',
          'blastoise',
          'alakazam',
          'gengar',
          'kangaskhan',
          'pinsir',
          'gyarados',
          'aerodactyl',
          'mewtwo',
          'ampharos',
          'scizor',
          'heracross',
          'houndoom',
          'tyranitar',
          'blaziken',
          'gardevoir',
          'mawile',
          'aggron',
          'medicham',
          'manectric',
          'banette',
          'absol',
          'latias',
          'latios',
          'garchomp',
          'lucario',
          'abomasnow',
          'beedrill',
          'pidgeot',
          'slowbro',
          'steelix',
          'sceptile',
          'swampert',
          'sableye',
          'sharpedo',
          'camerupt',
          'altaria',
          'glalie',
          'salamence',
          'metagross',
          'rayquaza',
          'lopunny',
          'gallade',
          'audino',
          'diancie'
        ];

        // Compulsory clean-up: this removes old data from the evoBtn and sets the stage for a new one

        if (
          typeof document.getElementById('evoBtn') != 'undefined' &&
          document.getElementById('evoBtn') != null
        ) {
          document.getElementById('evoBtn').remove();
        }
        let evoRes;
        try {
          evoRes = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${nameValue.toLowerCase()}`
          );
        } catch(err) {
          console.log(err)
        }
        console.log(evoRes);
        let evoData;

        if (megaEvoList.includes(nameValue)) {
          evoBtnCheck = false;

          let megaEvoBtn = document.createElement('button');
          megaEvoBtn.innerHTML = 'Mega Evolve! ✨';
          megaEvoBtn.id = 'evoBtn';

          let megaEvoBtnToggle = true;
          megaEvoBtn.onclick = async () => {
            if (megaEvoBtnToggle) {
              let megaEvo;

              let megaXY = ["x", "y"]
              if (nameValue=="charizard" || nameValue=="mewtwo") {
                let randInt = Math.floor(
                  Math.random() * 2
                );
                megaEvo = nameValue + "-mega-" + megaXY[randInt] 
              } else {
                megaEvo = nameValue + "-mega" 
              }
      
              megaEvoRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${megaEvo}`
              );

              console.log(megaEvoRes)

              if (shiny === true) {
                setImg(megaEvoRes.data.sprites.front_shiny);
              } else {
                setImg(megaEvoRes.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("shine");
              setTimeout(() => {
                document.getElementById("artCanvas").classList.toggle("shine");
              }, 6000) 
              setTimeout(() => {
                setURL(megaEvoRes.data.sprites.other['official-artwork'].front_default);
              }, 3000)
              megaEvoBtn.innerHTML = "↩️";
            } else {
              if (shiny === true) {
                setImg(res.data.sprites.front_shiny);
              } else {
                setImg(res.data.sprites.front_default);
              }
              document.getElementById("artCanvas").classList.toggle("deshine");
              setTimeout(() => {
                document.getElementById("artCanvas").classList.toggle("deshine");
              }, 2000) 
              setTimeout(() => {
                setURL(res.data.sprites.other['official-artwork'].front_default);
              }, 500)    
              megaEvoBtn.innerHTML = "Mega Evolve! ✨";
            }
            megaEvoBtnToggle = !megaEvoBtnToggle;
            console.log(megaEvoBtn)
          };
          document.getElementById('buttons').appendChild(megaEvoBtn);

        } else {
          try {
            try {
              let evoChain = await axios.get(evoRes.data.evolution_chain.url);
            
              let stageNumber = 1;
  
              if (evoChain.data.chain.evolves_to.length != 0) {
                // This check eliminates single-stage mons
        
                evoData = evoChain.data.chain.evolves_to[0].species.name;
                
                // This check determines the length of the evolution family
                if (evoChain.data.chain.evolves_to[0].evolves_to.length == 0) {
                  stageNumber = 2;
                } else {
                  stageNumber = 3;
                }      
                switch (stageNumber) {
                  case 2:
                    if (nameValue != evoChain.data.chain.species.name) {
                      console.log('This mon is the final stage of a 2-stager');
                      evoBtnCheck = false;
                    } else {
                      console.log('This mon is the 1st stage of a 2-stager');
                      evoBtnCheck = true;
                      // Check for branch-evos
                      console.log(evoChain.data.chain.evolves_to[0]);
                      let randInt = 0;
                      if (evoChain.data.chain.evolves_to.length > 1) {
                        randInt = Math.floor(
                          Math.random() * evoChain.data.chain.evolves_to.length
                        );
                        evoData = evoChain.data.chain.evolves_to[randInt].species.name;
                      }
                      evoData = evoChain.data.chain.evolves_to[randInt].species.name;
                    }
                    break;
                  case 3:
                    if (
                      nameValue != 'cascoon' &&
                      nameValue != evoData &&
                      nameValue != evoChain.data.chain.species.name
                    ) {
                      // This check eliminates mons that are final stages
                      console.log('This mon is the final stage of a 3-stager');
                      evoBtnCheck = false;
                      if (
                        typeof document.getElementById('evoBtn') != 'undefined' &&
                        document.getElementById('evoBtn') != null
                      ) {
                        document.getElementById('evoBtn').remove();
                        break;
                      }
                    } else if (
                      (nameValue == evoData &&
                      nameValue != evoChain.data.chain.species.name)
                    ) {
                      console.log('This mon is the middle stage of a 3-stager');
                      evoBtnCheck = true;
                      // Check for branch-evos
                      let randInt = 0;
                      if (evoChain.data.chain.evolves_to[0].evolves_to.length > 1) {
                        randInt = Math.floor(
                          Math.random() *
                            evoChain.data.chain.evolves_to[0].evolves_to.length
                        );
                        evoData =
                          evoChain.data.chain.evolves_to[0].evolves_to[randInt].species
                            .name;
                      }
                      evoData =
                        evoChain.data.chain.evolves_to[0].evolves_to[randInt].species
                          .name;
                    } else if (nameValue == 'cascoon') {
                      evoBtnCheck = true;
                      evoData = 'dustox';
                    }
                    else {
                      console.log('This mon is the 1st stage of a 3-stager');
                      evoBtnCheck = true;
                      // Check for branch-evos
                      console.log(evoChain.data.chain.evolves_to[0]);
                      let randInt = 0;
                      if (evoChain.data.chain.evolves_to.length > 1) {
                        randInt = Math.floor(
                          Math.random() * evoChain.data.chain.evolves_to.length
                        );
                        console.log(randInt);
                        evoData = evoChain.data.chain.evolves_to[randInt].species.name;
                      }
                      evoData = evoChain.data.chain.evolves_to[randInt].species.name;
                    }
                    break;
                }
              } else {
                // Either remove or simply not put the evoBtn there
                evoBtnCheck = false;
                if (
                  typeof document.getElementById('evoBtn') != 'undefined' &&
                  document.getElementById('evoBtn') != null
                ) {
                  document.getElementById('evoBtn').remove();
                }
              }
              } catch(err) {
                // console.log(err)
                evoData = await axios.get(evoRes.data.evolves_from_species.name);
                evoBtnCheck = false;
              }
        
              if (evoBtnCheck && document.getElementById("buttons").children.length < 3) {
                // Only create evoBtn if all conditions are right
                let evoBtn = document.createElement('button');
                evoBtn.innerHTML = 'Evolve!';
                evoBtn.id = 'evoBtn';
        
                evoBtn.onclick = () => {
                  // Check for branch-evos  
                  document.getElementById("artCanvas").classList.toggle("shine");
                  setTimeout(() => {
                    document.getElementById("artCanvas").classList.toggle("shine");
                  }, 6000)
                  
                  setTimeout(() => {
                    setStateFind(evoData);
                  }, 3000)
                };
                document.getElementById('buttons').appendChild(evoBtn);
              }
          } catch(err) {
            console.log(err)
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
            setImg(res.data.sprites.front_shiny);
          } else {
            setImg(res.data.sprites.front_default);
          }
        }
        setURL(res.data.sprites.other['official-artwork'].front_default);
        try {
          setType('The ' + evoRes.data.genera[7].genus);
        } catch {
          setType('The ' + evoRes.data.genera[4].genus);
        }
        setStateFind(res.data.name);
        setNumValue(res.data.id);

      } catch(err) {
        console.log(err)
      }
    }

    getData();
  }, [nameValue, shiny, numValue]);

  const increase = () => {
    numValue = numValue + 1;
    setNumValue(numValue);
    setStateFind(numValue.toString());
  };

  const decrease = () => {
    numValue = numValue - 1;
    setNumValue(numValue);
    setStateFind(numValue.toString());
  };

  useEffect(() => {
    const container = document.querySelector('.pokeCard');
    const myCanvas = document.getElementById('my-canvas');
    const imgData = document.getElementById('imgData');
    const myContext = myCanvas.getContext('2d');
    const img = new Image();
    myCanvas.willReadFrequently = true;
    img.crossOrigin = 'Anonymous';
    img.src = imgData.src;
    img.onload = () => {
      myContext.beginPath();
      myContext.clearRect(0, 0, 100, 100);
      myContext.stroke();
      myContext.drawImage(img, 0, 0);
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
        const rgb = '#' + r1 + r2 + g1 + g2 + b1 + b2;
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

      delete counts['#101010'];
      delete counts['#000000'];
      delete counts['#0f0f0f'];
      delete counts['#010101'];
      delete counts['#080808'];
      delete counts['#202020'];
      delete counts['#181818'];
      delete counts['#181810'];
      delete counts['#292929'];
      delete counts['#0f110d'];
      delete counts['#e8e8e8'];
      delete counts['#020501'];
      delete counts['#050505'];

      let colorScheme = Object.entries(counts);
      let sortedScheme = colorScheme.sort((a, b) => a[1] - b[1]).reverse();

      let bgStr =
        'linear-gradient(-5deg,' +
        sortedScheme[2][0] +
        ' 0%,' +
        sortedScheme[2][0] +
        ' 20%,' +
        sortedScheme[1][0] +
        ' 20%,' +
        sortedScheme[1][0] +
        ' 80%,' +
        sortedScheme[0][0] +
        ' 80%,' +
        sortedScheme[0][0] +
        ' 100%)';
      container.style.background = bgStr;

      color2 = sortedScheme[0][0];
      color3 = sortedScheme[1][0];
      color4 = sortedScheme[2][0];

      let color_list = { color2: color2, color3: color3, color4: color4 };
      let hsp_list = ['--hsp2', '--hsp3', '--hsp4'];
      let anti_hsp_list = ['--anti_hsp2', '--anti_hsp3', '--anti_hsp4'];
      let root = document.querySelector(':root');

      let i = 0;
      for (const [key, value] of Object.entries(color_list)) {
        if (hsp(value.toUpperCase()) > 150) {
          root.style.setProperty(hsp_list[i], '#121212');
          root.style.setProperty(anti_hsp_list[i], '#f1f1f1');
        } else {
          root.style.setProperty(hsp_list[i], '#f1f1f1');
          root.style.setProperty(anti_hsp_list[i], '#121212');
        }
        for (let j = 0; j < document.getElementsByClassName(key).length; j++) {
          document.getElementsByClassName(key)[j].innerHTML =
            value.toUpperCase();
        }
        i++;
      }

      let fullArtURL = "url('" + artURL + "')";

      root.style.setProperty('--color2', color2);
      root.style.setProperty('--color3', color3);
      root.style.setProperty('--color4', color4);

      root.style.setProperty('--artURL', fullArtURL);

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

  return (
    <div className="pokeCard">
      <canvas id="my-canvas" width="100px" height="100px"></canvas>

      <img
        style={{ display: 'none' }}
        id="imgData"
        crossOrigin="Anonymous"
        src={`${Img}`}
        alt=""
      />

      <div className="type">{Type}</div>

      <input
        type="text"
        id="nameInput"
        onChange={NameChanger}
        value={nameValue}
      />
      <div id="numLine">
        <button class="noSelect" onClick={decrease}>
          <p>
            <BsArrowDownSquareFill size={30} />
          </p>
        </button>
        <input
          type="number"
          id="numInput"
          step="1"
          max="10250"
          min="1"
          onChange={NumChanger}
          value={numValue}
        />
        <button class="noSelect" onClick={increase}>
          <p>
            <BsArrowUpSquareFill size={30} />
          </p>
        </button>
      </div>

      <div id="buttons">
        <button id="shinyBtn" onClick={ShinyChange}>
          Shiny
        </button>
        <button id="randomBtn" onClick={Randomize}>
          Randomize
        </button>
      </div>
    </div>
  );
}
