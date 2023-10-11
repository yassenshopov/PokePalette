import { FaMoon, FaSun, FaTwitter, FaGithub } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import bgDark from "../src/img/bgDark.webp";
import bgLight from "../src/img/bgLight.webp";
import twitterLogo from "../src/img/x.webp";
import { useState } from "react";

export default function Example() {
  const [loadMoreCardsToggle, setLoadMoreCardsToggle] = useState(true);

  function Card({ cardIndex }) {
    let colorName = "color" + cardIndex;

    return (
      <div
        className={
          "noSelect colorCard" +
          (loadMoreCardsToggle && cardIndex > 4 ? " hidden" : "")
        }
        onClick={() => {
          let copyText = window
            .getComputedStyle(
              document.getElementsByClassName(colorName)[0],
              ":after"
            )
            .content.replace(/"/g, "")
            .replace(/'/g, "");
          navigator.clipboard.writeText(copyText);
          copyText.select();
          copyText.setSelectionRange(0, 99989); // For mobile devices
        }}
      >
        <p className={"color" + cardIndex}></p>
        <BiCopy />
      </div>
    );
  }

  let darkTheme = true;

  const scrollDown = () => {
    window.scrollBy({
      top: 900,
      behavior: "smooth",
    });
  };

  const tweet = () => {
    let tweetText = document.getElementsByClassName("tweet-input")[0].value;
    let tweetURL = "https://twitter.com/intent/tweet?text=" + tweetText;

    window.open(tweetURL);
  };

  const [darkMode, setDarkMode] = useState(false);

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
          <div id="customButtons">
            <button id="scrollDown" onClick={scrollDown}>
              Scroll down ⬇
            </button>
            <button
              id="darkMode"
              aria-label="Dark or Light Mode"
              className={"noSelect " + (darkMode ? "clicked" : "")}
              onClick={() => {
                setDarkMode(!darkMode);
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
                  // document.getElementById("sun").style.display = "none";
                  // document.getElementById("moon").style.display =
                  // "inline-block";
                } else {
                  root.style.setProperty("--bgURL", "url('" + bgDark + "')");
                  // document.getElementById("moon").style.display = "none";
                  // document.getElementById("sun").style.display = "inline-block";
                }
                darkTheme = !darkTheme;
              }}
            >
              <FaMoon />
              <FaSun />
              <div></div>
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
        <p
          id="loadMore"
          className="loadMore noSelect"
          onClick={() => {
            setLoadMoreCardsToggle(!loadMoreCardsToggle);
          }}
        >
          {loadMoreCardsToggle ? "Load more colors..." : "Show less"}
        </p>
      </div>

      <section id="pkmnInfo">
        <div className="txtWrapper">
          <h2>Pokemon name</h2>
          <div id="types">
            <div id="primaryType"></div>
            <div id="secondaryType"></div>
          </div>
          <p className="description"></p>
        </div>
        <div className="imgWrapper">
          <div id="hiddenPkmn"></div>
          <span className="colorFilter"></span>
        </div>
      </section>

      <section className="imAd">
        <div className="sampleSite">
          <div id="palette">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id="site">
            <nav>
              <div id="logo"></div>
              <div id="links">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </nav>
            <main>
              <div id="text">
                <p id="h1"></p>
                <p></p>
              </div>
              <div id="img"></div>
            </main>
            <footer></footer>
          </div>
        </div>
        <div id="info">
          <h2>
            Create <span className="pokeName">a Pokemon</span>-inspired website
          </h2>
          <p id="title">
            Use this color palette to create a<br></br>
            <div id="titleWords">
              <span>beautiful</span>
              <span>functional</span>
              <span>customisable</span>
            </div>
            website with <strong>Inkmorphism</strong> - the AI website builder
          </p>
          <button
            onClick={() => {
              window.open("https://inkmorphism.com");
            }}
            className="noSelect"
          >
            Get started for free
          </button>
        </div>
      </section>

      <section id="shareWidgets">
        <div className="tweet-popup">
          <img className="tweetLogo" src={twitterLogo} alt="Twitter Logo" />
          <textarea
            className="tweet-input"
            placeholder="What's happening?"
            spellCheck="false"
          ></textarea>
          <button className="tweet-button noSelect" onClick={tweet}>
            Tweet
          </button>
        </div>
        <div id="share">
          <h2>Share with your friends!</h2>
          <p>Share this color palette on Twitter with a single click</p>
        </div>
      </section>

      <footer id="footer">
        <p>
          Copyright © PokePalette 2022<br></br>- by{" "}
          <a
            href="https://github.com/yassenshopov"
            target="_blank"
            rel="noreferrer"
          >
            Yassen Shopov
          </a>
        </p>
        <div id="faIcons">
          <a
            href="https://twitter.com/yassenshopov"
            target="_blank"
            rel="noreferrer"
            className="noSelect"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com/yassenshopov"
            target="_blank"
            rel="noreferrer"
            className="noSelect"
          >
            <FaGithub />
          </a>
        </div>
      </footer>
    </div>
  );
}
