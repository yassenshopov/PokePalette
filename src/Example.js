import { FaReact, FaMoon, FaSun, FaTwitter, FaGithub } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import bgDark from "../src/img/bgDark.webp";
import bgLight from "../src/img/bgLight.webp";
import twitterLogo from "../src/img/x.webp";

export default function Example() {
  let loadMoreCardsToggle = false;
  function loadMoreCards() {
    if (loadMoreCardsToggle === true) {
      loadMoreCardsToggle = false;
      let cards = document.getElementsByClassName("colorCard");
      for (let card in cards) {
        if (card > 2) {
          cards[card].style.display = "none";
        }
      }
      document.getElementsByClassName("loadMore")[0].innerHTML =
        "Load more colors...";
    } else {
      loadMoreCardsToggle = true;
      let cards = document.getElementsByClassName("colorCard");
      for (let card in cards) {
        if (card > 2) {
          cards[card].style.display = "flex";
        }
      }
      console.log(document.getElementsByClassName("loadMore"));
      document.getElementsByClassName("loadMore")[0].innerHTML = "Show less";
    }
  }

  function Card({ cardIndex }) {
    console.log(cardIndex);
    let colorName = "color" + cardIndex;

    return (
      <div
        className="noSelect colorCard"
        onClick={() => {
          let copyText =
            document.getElementsByClassName(colorName)[0].innerHTML;
          navigator.clipboard.writeText(copyText);
          copyText.select();
          copyText.setSelectionRange(0, 99999); // For mobile devices
        }}
      >
        <div className="color-card"></div>
        <p className={"color" + cardIndex}></p>
        <BiCopy />
      </div>
    );
  }

  let darkTheme = true;

  const scrollDown = () => {
    window.scrollBy({
      top: 600,
      behavior: "smooth",
    });
  };

  const tweet = () => {
    let tweetText = document.getElementsByClassName("tweet-input")[0].value;
    let tweetURL = "https://twitter.com/intent/tweet?text=" + tweetText;

    window.open(tweetURL);
  };

  return (
    <div id="example">
      <main id="main">
        <div id="backdrop"></div>

        <section id="section">
          <h1>Your website - inspired by colours</h1>
          <p>
            This website allows you to enter a Pokemon's name (or simply its
            number in the Pokedex), and its top 3 colours will be extracted.
          </p>
          <p>
            [Built with <strong>React</strong> <FaReact id="faReact" /> and the{" "}
            <strong>PokeAPI</strong> <MdCatchingPokemon />]
          </p>
          <div id="customButtons">
            <button id="scrollDown" onClick={scrollDown}>
              Scroll down ⬇
            </button>
            <button
              id="darkMode"
              aria-label="Dark or Light Mode"
              onClick={() => {
                let root = document.querySelector(":root");
                let temp_color =
                  getComputedStyle(root).getPropertyValue("--color1");
                root.style.setProperty(
                  "--color1",
                  getComputedStyle(root).getPropertyValue("--mainDark")
                );
                root.style.setProperty("--mainDark", temp_color);
                if (darkTheme) {
                  root.style.setProperty("--bgURL", "url('" + bgLight + "')");
                  document.getElementById("sun").style.display = "none";
                  document.getElementById("moon").style.display =
                    "inline-block";
                } else {
                  root.style.setProperty("--bgURL", "url('" + bgDark + "')");
                  document.getElementById("moon").style.display = "none";
                  document.getElementById("sun").style.display = "inline-block";
                }
                darkTheme = !darkTheme;
              }}
            >
              <div id="sun">
                <FaSun />
              </div>
              <div id="moon">
                <FaMoon />
              </div>
            </button>
          </div>
        </section>
        <aside id="artCanvas">
          <div id="colorFilter"></div>
        </aside>
      </main>

      <div id="cards">
        <Card cardIndex={2} />
        <Card cardIndex={3} />
        <Card cardIndex={4} />
        <Card cardIndex={5} />
        <Card cardIndex={6} />
        <Card cardIndex={7} />
        <Card cardIndex={8} />
        <Card cardIndex={9} />
        <Card cardIndex={10} />
        <p id="loadMore" className="loadMore noSelect" onClick={loadMoreCards}>
          Load more colors...
        </p>
      </div>

      <section id="shareWidgets">
        <div class="tweet-popup">
          <img class="tweetLogo" src={twitterLogo} />
          <textarea
            class="tweet-input"
            placeholder="What's happening?"
            spellCheck="false"
          ></textarea>
          <button class="tweet-button" onClick={tweet}>
            Tweet
          </button>
        </div>
        <div id="share">
          <p>Share this color palette with your friends!</p>
        </div>
      </section>

      <section id="pkmnInfo">
        <div className="txtWrapper">
          <h2></h2>
          <p></p>
        </div>
        <div className="imgWrapper">
          <div id="hiddenPkmn"></div>
          <span className="colorFilter"></span>
        </div>
      </section>

      <footer id="footer">
        <p>
          Copyright © PokePalette 2022<br></br>- by{" "}
          <a href="https://github.com/yassenshopov" target="_blank">
            Yassen Shopov
          </a>
        </p>
        <div id="faIcons">
          <a href="https://twitter.com/yassenshopov" target="_blank">
            <FaTwitter />
          </a>
          <a href="https://github.com/yassenshopov" target="_blank">
            <FaGithub />
          </a>
        </div>
      </footer>
    </div>
  );
}
