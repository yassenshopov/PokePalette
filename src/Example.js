import { FaReact, FaMoon, FaSun } from 'react-icons/fa';
import bgDark from "../src/img/bgDark.jpg"
import bgLight from "../src/img/bgLight.jpg"
// let bg = bgDark;

let darkTheme = true;

export default function Example() {
  return (
    <div id="example">
      <main id="main">
        <div id="backdrop"></div>

        <section id="section">
          <h1>Your website - inspired by colours</h1>
          <p>
            This page was built with <strong>React</strong>{' '}
            <FaReact id="faReact" />
          </p>
          <p>
            It allows you to enter a Pokemon's name (or simply its number in the
            Pokedex), and its top 3 colours will be extracted.
          </p>
          <div>
            <a id="scrollDown" href='#posts'>Scroll down ⬇</a>
            <button id="darkMode" onClick={() => {

              let root = document.querySelector(":root");
              let temp_color = getComputedStyle(root).getPropertyValue("--color1");
              root.style.setProperty('--color1', getComputedStyle(root).getPropertyValue("--color5"));
              root.style.setProperty('--color5', temp_color);
              if (darkTheme) {
                // document.getElementById("main").style["background-position"] = 'left'
                root.style.setProperty('--bgURL', "url('"+ bgLight + "')")
                // bg = bgDark;
                // document.getElementById("darkModeIcon").remove()
                // let faMoon = document.createElement("FaMoon");
                // document.getElementById("container").appendChild(faMoon)
                document.getElementById("sun").style.display = "none"
                document.getElementById("moon").style.display = "inline-block"

              } else {
                // bg = bgLight;
                // document.getElementById("main").style["background-position"] = 'right'
                root.style.setProperty('--bgURL', "url('"+ bgDark + "')")
                document.getElementById("moon").style.display = "none"
                document.getElementById("sun").style.display = "inline-block"
              }
              darkTheme = !darkTheme;
            }}>    
            <div id="sun">
              <FaSun/>
            </div>

            <div id="moon"><FaMoon/></div>

            </button>
          </div>
        </section>
        <aside id="artCanvas">
          {/* <article id="gradientArticle">
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>

            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>

            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>

            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>

            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
            <div className="gridItem"></div>
          </article> */}
        </aside>
      </main>
      
      <div id="cards">
        <div onClick={() => {
            let copyText = document.getElementsByClassName("color2")[0].innerHTML;
            navigator.clipboard.writeText(copyText);
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices
            }}>
          <div className="color-card"></div>
          <p className="color2"></p>
        </div>
        <div onClick={() => {
            let copyText = document.getElementsByClassName("color3")[0].innerHTML;
            navigator.clipboard.writeText(copyText);
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices
            }}>
          <div className="color-card"></div>
          <p className="color3"></p>
        </div>
        <div onClick={() => {
            let copyText = document.getElementsByClassName("color4")[0].innerHTML;
            navigator.clipboard.writeText(copyText);
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices
            }}>
          <div class="color-card"></div>
          <p class="color4"></p>
        </div>
      </div>

      <div id="posts"></div>

      <footer id="footer">
        <p style={{ padding: '20px' }}>Copyright © PokePalette Studio - by <a href='https://github.com/yassenshopov'>Yassen Shopov</a></p>
      </footer>
    </div>
  );
}