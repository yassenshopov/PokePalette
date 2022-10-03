import React, { useState, useEffect } from "react";
import axios from "axios";

let shiny = false;

export default function Poke() {

    const [name, setname] = useState("");
    let [Find, setFind] = useState("pikachu");
    const [Img, setImg] = useState("");
    const [Type, setType] = useState("");

    useEffect(() => {
      async function getData() {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Find}`);
        console.log(res);
        if (shiny == true) {
          setImg(res.data.sprites.front_shiny);
        }
        else {
          setImg(res.data.sprites.front_default);
        }
        if (res.data.types.length == 2) {
          setType((res.data.types[0].type.name + "/" + res.data.types[1].type.name).toUpperCase());
        }
        else {
          setType(res.data.types[0].type.name.toUpperCase());
        }
      };
    getData();
    }, [Find]);
  
    const Typename = (event) => {
      setname(event.target.value);
    };

    const ShinyChange = () => {
      shiny = !shiny;
      const shinyBtn = document.getElementById('shinyBtn');

      if (shiny === true) {
        shinyBtn.style["background-color"] = "#121212";
      }
      else {
        shinyBtn.style["background-color"] = "#ffffff";
      }
      console.log(Find);
      if (name !== "") {
        name = Find;
        setFind(name.toLowerCase())
      };
      setname("");
    };
  
    const Search = () => {
      if (name !== "") setFind(name.toLowerCase());
      setname("");
    };

    useEffect(() => {
            let input = document.getElementById("nameInput");

            input.addEventListener("keypress", function(event) {
              if (event.key === "Enter") {
                document.getElementById("searchBtn").click();
              };
            });

            const container = document.querySelector('.pokeCard');
            const myCanvas = document.getElementById('my-canvas'); 
            const imgData = document.getElementById('imgData'); 
            const myContext = myCanvas.getContext('2d');
            const img = new Image();   
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
              let bgStr = "linear-gradient(-0deg," + sortedScheme[0][0] + " 0%," + sortedScheme[0][0] + " 25%," + sortedScheme[1][0] + " 25%," + sortedScheme[1][0] + " 75%," + sortedScheme[2][0] + " 75%," + sortedScheme[2][0] + " 100%)";
              container.style.background = bgStr;

              const website = document.getElementById('example');
              const nav = document.getElementById('nav');
              const section1 = document.getElementById('section1');
              const article1 = document.getElementById('article1');
              const article2 = document.getElementById('article2');
              const footer = document.getElementById('footer');
              section1.style["background"] = sortedScheme[0][0];
              article1.style["background"] = sortedScheme[0][0];
              article2.style["background"] = sortedScheme[0][0];
              nav.style["background"] = sortedScheme[0][0];
              footer.style["background"] = sortedScheme[0][0];
              // website["main"]["section"].style["background-color"] = sortedScheme[0][0];

              
            };
          });

    
    return (
        <div className="pokeCard">
            <canvas id="my-canvas" width="100px" height="100px"></canvas>

            <img style={{display: "none"}} id="imgData" crossOrigin="Anonymous" src={`${Img}`} alt="" />
            <div className="name">{Find.toUpperCase()}</div>
  
            <div className="type">{Type}</div>
  
            <input type="text" id="nameInput" onChange={Typename} value={name} />
  
            <div id="buttons">
              <button id="searchBtn" onClick={Search}>Search</button>
              <button id="shinyBtn" onClick={ShinyChange}>Shiny</button>
            </div>
        </div>
    );
    
};