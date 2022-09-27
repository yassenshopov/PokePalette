import React, { useState, useEffect } from "react";
import axios from "axios";
import {FastAverageColor} from "fast-average-color";

export default function Poke() {
    const [name, setname] = useState("");
    const [Find, setFind] = useState("pikachu");
    const [Img, setImg] = useState("");
    const [Type, setType] = useState("");
  
    useEffect(() => {
      async function getData() {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Find}`);
        console.log(res);
        setImg(res.data.sprites.front_default);
        setType(res.data.types[0].type.name);
      }
  
      getData();
    }, [Find]);
  
    const Typename = (event) => {
      setname(event.target.value);
    };
  
    const Search = () => {
      if (name !== "") setFind(name);
      setname("");
    };

    useEffect(() => {
        const fac = new FastAverageColor();
        const container = document.querySelector('.App');
  
        fac
          .getColorAsync(container.querySelector('img'), {
            ignoredColor: [
                // [255, 255, 255, 0]
                [0, 0, 0, 0]
            ]
          })
          .then((color) => {
            container.style.backgroundColor = color.rgba;
            container.style.color = color.isDark ? '#fff' : '#000';
          })
          .catch((e) => {
            console.log(e);
          });
        const track=document.querySelector('.card')//To access the div with class slide track
        console.log(track);
    });
    
  
    return (
        <div className="back">
          <div className="card">
            <img crossOrigin="Anonymous" src={`${Img}`} alt="" />
            <div className="name">{Find.toUpperCase()}</div>
  
            <div className="type">{Type}</div>
  
            <input type="text" onChange={Typename} value={name} />
  
            <button onClick={Search}>Search</button>
            <script src="https://unpkg.com/fast-average-color/dist/index.browser.min.js"></script>
          </div>
        </div>
    );
  }