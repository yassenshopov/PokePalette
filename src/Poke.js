import React, { useState, useEffect } from "react";
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from "react-icons/bs";
import axios from "axios";

let shiny = false;
let randomSwitch = false;

export default function Poke() {

    let [nameValue, setStateFind] = useState("wooper");
    let [numValue, setNumValue] = useState(0);

    const NumChanger = (e) => {
      setNumValue(e.target.value);
      setStateFind(e.target.value)
    }

    const NameChanger = (e) => {
      setStateFind(e.target.value)
    }

    let [shiny, setShiny] = useState(false);
    let [random, setRandom] = useState(81);

    const ShinyChange = () => {
      setShiny(!shiny)
    }

    const Randomize = () => {
      let random = 1 + Math.floor(Math.random() * 898);
      setRandom(random);
      random = random.toString();
      setStateFind(random);
    }

    let [name, setname] = useState("");
    let [Img, setImg] = useState("");
    const [Type, setType] = useState("");

    useEffect(() => {
      async function getData() {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameValue.toLowerCase()}`);
        console.log(res);
        if (shiny === true) {
          setImg(res.data.sprites.front_shiny);
        }
        else {
          setImg(res.data.sprites.front_default);
        }
        if (res.data.types.length === 2) {
          setType((res.data.types[0].type.name + "/" + res.data.types[1].type.name).toUpperCase());
        }
        else {
          setType(res.data.types[0].type.name.toUpperCase());
        }
        
        setStateFind(res.data.name)
        setNumValue(res.data.id)
      };

      getData();
    }, [nameValue, shiny, numValue]);
  
    const increase = () => {
      numValue = numValue + 1;
      setNumValue(numValue);
      console.log(numValue)
      setStateFind(numValue.toString());
    };
   
    const decrease = () => {
      console.log(typeof numValue)
      numValue = numValue - 1;
      setNumValue(numValue);
      console.log(numValue)
      setStateFind(numValue.toString());
    };


    useEffect(() => {
            const container = document.querySelector('.pokeCard');
            const myCanvas = document.getElementById('my-canvas'); 
            const imgData = document.getElementById('imgData'); 
            const myContext = myCanvas.getContext('2d');
            const img = new Image();
            myCanvas.willReadFrequently = true;
            img.crossOrigin = "Anonymous";   
            img.src = imgData.src;        
            img.onload = () => {
              myContext.beginPath();
              myContext.clearRect(0, 0, 100, 100);
              myContext.stroke(); 
              myContext.drawImage(img, 0, 0);        
              const imageData = myContext.getImageData(0, 0, myCanvas.width, myCanvas.height);
              const rgbValues = [];
              for (let i = 0; i < imageData.data.length; i += 4) {
                let r = imageData.data[i];
                let r1 = Math.floor(r/16).toString(16);
                let r2 = (((r/16) - Math.floor(r/16))*16).toString(16);
                let g = imageData.data[i+1];
                let g1 = Math.floor(g/16).toString(16);
                let g2 = (((g/16) - Math.floor(g/16))*16).toString(16);
                let b = imageData.data[i+2];
                let b1 = Math.floor(b/16).toString(16);
                let b2 = (((b/16) - Math.floor(b/16))*16).toString(16);
                const rgb = '#' + r1 + r2 + g1 + g2 + b1 + b2;
                rgbValues.push(rgb);
              }

              let counts = {};
              for (let i = 0; i < rgbValues.length; i++) {
                if (!(rgbValues[i] in counts)) {
                  counts[rgbValues[i]] = 1;
                }
                else {
                  counts[rgbValues[i]] = counts[rgbValues[i]] + 1; 
                }
              }

              delete counts["#101010"];
              delete counts["#000000"];

              let colorScheme = Object.entries(counts);
              let sortedScheme = colorScheme.sort((a,b) => a[1] - b[1]).reverse();
              let bgStr = "linear-gradient(0deg," + sortedScheme[2][0] + " 0%," + sortedScheme[2][0] + " 25%," + sortedScheme[1][0] + " 25%," + sortedScheme[1][0] + " 75%," + sortedScheme[0][0] + " 75%," + sortedScheme[0][0] + " 100%)";
              container.style.background = bgStr;

              let root = document.querySelector(":root");
              root.style.setProperty('--color2', sortedScheme[0][0])
              root.style.setProperty('--color3', sortedScheme[1][0])
              root.style.setProperty('--color4', sortedScheme[2][0])

              let gradientA = document.getElementById('gradientArticle');
              let gradient = "linear-gradient(149deg," + sortedScheme[0][0] + " 0%," + sortedScheme[2][0] + " 100%";

            };
          });

    
    return (
        <div className="pokeCard">

            <canvas id="my-canvas" width="100px" height="100px"></canvas>

            <img style={{display: "none"}} id="imgData" crossOrigin="Anonymous" src={`${Img}`} alt="" />
  
            <div className="random">{random}</div>
            <div className="type">{Type}</div>
  
            <input type="text" id="nameInput" onChange={NameChanger} value={nameValue} />
            <div id="numLine">
              <button class="noSelect" onClick={decrease}><p>< BsArrowDownSquareFill size={25} /></p></button>
              <input type="number" id="numInput" step="1" max="10250" min="1" onChange={NumChanger} value={numValue} />
              <button class="noSelect" onClick={increase}><p>< BsArrowUpSquareFill size={25} /></p></button>
            </div>

            <div id="buttons">
              <button id="shinyBtn" onClick={ShinyChange}>Shiny</button>
              <button id="randomBtn" onClick={Randomize}>Randomize</button>
            </div>
        </div>
    );
    
};