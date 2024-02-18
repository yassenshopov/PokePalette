import { FaMoon, FaSun, FaTwitter, FaGithub } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import bgDark from "../src/img/bgDark.webp";
import bgLight from "../src/img/bgLight.webp";
import twitterLogo from "../src/img/x.webp";
import imLogo from "../src/img/imLogo.webp";
import { useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import html2canvas from "html2canvas";

export default function Example({ dynamicContent, pokemon }) {
  console.log(pokemon);

  const colorList = [
    {
      pokeball: {
        color1: "#f18e38",
        // coeff1: 1/50,
        color2: "#f06d57",
        // coeff2: 1/25,
        color3: "#f5f4f5",
        // coeff3: 1/25,
      },
    },
    {
      greatball: {
        type: "dragon",
        color1: "#268ab7",
        color2: "#ed533a",
        color3: "#f5f4f5",
      },
    },
    {
      ultraball: {
        color1: "#515151",
        color2: "#515151",
        color3: "#f6d044",
      },
    },
    {
      masterball: {
        color1: "#7E2E8E",
        // coeff1: 1/50,
        color2: "#5E308F",
        // coeff2: 1/40,
        color3: "#CA2E8C",
        // coeff3: 1/10,
      },
    },
    {
      premierball: {
        type: "normal",
        color1: "#ffffff",
        color2: "#ffffff",
        color3: "#ffffff",
      },
    },
    {
      healball: {
        type: "psychic",
        color1: "#eebdd6",
        // coeff1: 1/60,
        color2: "#fbf2ea",
        // coeff2: 1/30,
        color3: "#65aadd",
        // coeff3: 1/10,
      },
    },
    {
      netball: {
        type: "bug",
        color1: "#46acad",
        color2: "#333333",
        color3: "#f5f4f5",
      },
    },
    {
      nestball: {
        type: "ground",
        color1: "#7fa174",
        color2: "#d0ab78",
        color3: "#f5f4f5",
      },
    },
    {
      diveball: {
        type: "ice",
        color1: "#75bde6",
        color2: "#0f4a81",
        color3: "#dfebf0",
      },
    },
    {
      duskball: {
        type: "ghost",
        color1: "#232626",
        color2: "#50A04A",
        color3: "#e0610d",
      },
    },
    {
      timerball: {
        type: "poison",
        color1: "#f2f2f2",
        color2: "#f2f2f2",
        color3: "#f18e38",
      },
    },
    {
      quickball: {
        type: "electric",
        color1: "#73b5e4",
        color2: "#efea2e",
        color3: "#3b82c4",
      },
    },
    {
      repeatball: {
        type: "fire",
        color1: "#f28f38",
        color2: "#fff338",
        color3: "#a1a2a7",
      },
    },
    {
      luxuryball: {
        type: "fighting",
        color1: "#626871",
        color2: "#626871",
        color3: "#D35237",
      },
    },
    {
      safariball: {
        color1: "#307D54",
        color2: "#AAA54C",
        color3: "#779752",
      },
    },
    {
      fastball: {
        type: "flying",
        color1: "#E98D44",
        color2: "#E9C241",
        color3: "#ffffff",
      },
    },
    {
      friendball: {
        type: "grass",
        color1: "#80BA41",
        color2: "#6EA848",
        color3: "#E15B4D",
      },
    },
    {
      lureball: {
        type: "water",
        color1: "#3589BE",
        color2: "#D45E69",
        color3: "#F3AF5B",
      },
    },
    {
      levelball: {
        type: "rock",
        color1: "#DA925C",
        // coeff1: 1 / 50,
        color2: "#796961",
        // coeff2: 1 / 40,
        color3: "#D3463B",
        // coeff3: 1 / 10,
      },
    },
    {
      heavyball: {
        type: "steel",
        color1: "#8DA2B0",
        color2: "#8DA2B0",
        color3: "#4876BB",
      },
    },
    {
      loveball: {
        type: "fairy",
        color1: "#D580AC",
        color2: "#F8CADE",
        color3: "#ffffff",
      },
    },
    {
      moonball: {
        type: "dark",
        color1: "#5E7090",
        color2: "#3FB8DB",
        color3: "#E9C241",
      },
    },
    {
      dreamball: {
        color1: "#F4B4D0",
        color2: "#EA6099",
        color3: "#8F70AF",
      },
    },
    {
      beastball: {
        color1: "#3962AD",
        color2: "#E4D044",
        color3: "#92D6F7",
      },
    },
    {
      sportball: {
        color1: "#F18E38",
        color2: "#D35337",
        color3: "#FEFAF6",
      },
    },
    {
      cherishball: {
        color1: "#E84535",
        color2: "#E84535",
        color3: "#4E5452",
      },
    },
  ];

  let root = document.querySelector(":root");

  const [loadMoreCardsToggle, setLoadMoreCardsToggle] = useState(true);

  const ScreenshotComponent = ({ target, ctaTxt }) => {
    const captureScreenshot = () => {
      const element = document.getElementById(target);
      if (element) {
        html2canvas(element, {
          useCORS: true, // Enable use of cross-origin images
          allowTaint: true, // Allow cross-origin images to taint the canvas
        }).then((canvas) => {
          const screenshot = canvas.toDataURL("image/png");
          // openScreenshotWindow(screenshot);
          // Create a link element to trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = screenshot;
          downloadLink.download = "screenshot.png";
          downloadLink.click();
        });
      }
    };

    const openScreenshotWindow = (screenshot) => {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write('<img src="' + screenshot + '" />');
      }
    };

    return (
      <button id="screenshotBtn" onClick={captureScreenshot}>
        {ctaTxt}
      </button>
    );
  };

  function Ball({ ballType, index, type }) {
    return (
      <div className="ballMiniSection">
        {type ? (
          <p>
            {ballType.charAt(0).toUpperCase() + ballType.slice(1)}
            <br></br>
            {index === 5 ? "Secondary type" : "Primary type"}:<br></br>
            {/* {type.toUpperCase()} */}
            <img
              src={"https://www.serebii.net/pokedex-bw/type/" + type + ".gif"}
              alt={type}
              className="typeImg"
            />
          </p>
        ) : (
          <p>
            #{index}: {ballType.charAt(0).toUpperCase() + ballType.slice(1)}
          </p>
        )}
        <img
          src={
            "https://www.serebii.net/itemdex/sprites/pgl/" + ballType + ".png"
          }
          alt={ballType}
        />
        <div className={"ball " + ballType} style={{ display: "flex" }}>
          <div
            className="ballColor1"
            style={{
              backgroundColor:
                colorList[colorList.findIndex((x) => x[ballType])][ballType]
                  .color1,
            }}
          ></div>
          <div
            className="ballColor2"
            style={{
              backgroundColor:
                colorList[colorList.findIndex((x) => x[ballType])][ballType]
                  .color2,
            }}
          ></div>
          <div
            className="ballColor3"
            style={{
              backgroundColor:
                colorList[colorList.findIndex((x) => x[ballType])][ballType]
                  .color3,
            }}
          ></div>
        </div>
      </div>
    );
  }

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

  const [isSpecialEdition, setIsSpecialEdition] = useState(false);

  const versionMap = {
    red: "Red",
    blue: "Blue",
    yellow: "Yellow",
    gold: "Gold",
    silver: "Silver",
    crystal: "Crystal",
    ruby: "Ruby",
    sapphire: "Sapphire",
    emerald: "Emerald",
    firered: "FireRed",
    leafgreen: "LeafGreen",
    diamond: "Diamond",
    pearl: "Pearl",
    platinum: "Platinum",
    heartgold: "HeartGold",
    soulsilver: "SoulSilver",
    black: "Black",
    white: "White",
    "black-2": "Black 2",
    "white-2": "White 2",
    x: "X",
    y: "Y",
    "omega-ruby": "Omega Ruby",
    "alpha-sapphire": "Alpha Sapphire",
    sun: "Sun",
    moon: "Moon",
    "ultra-sun": "Ultra Sun",
    "ultra-moon": "Ultra Moon",
    "lets-go-pikachu": "Let's Go Pikachu",
    "lets-go-eevee": "Let's Go Eevee",
    sword: "Sword",
    shield: "Shield",
    "brilliant-diamond": "Brilliant Diamond",
    "shining-pearl": "Shining Pearl",
    "legends-arceus": "Legends Arceus",
    scarlet: "Scarlet",
    violet: "Violet",
  };

  const FlavorTxtComponent = ({ entries }) => {
    const [entryIndex, setEntryIndex] = useState(0);
    return (
      <div>
        <p id="descriptionTxt">
          {entries[entryIndex].flavor_text
            .replace(//g, " ")
            .replace(/\n/g, " ")}
        </p>
        <div id="flavorTxtNav">
          <p className={"version " + entries[entryIndex].version.name}>
            Pokemon {versionMap[entries[entryIndex].version.name] || "Version"}{" "}
          </p>
          <button
            onClick={() => {
              setEntryIndex(entryIndex - 1);
            }}
            className="noSelect"
            disabled={entryIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setEntryIndex(entryIndex + 1);
            }}
            className="noSelect"
            disabled={entryIndex === entries.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div id="example">
      <main id="main">
        <section id="section">
          {/* <h1>Your website - inspired by colours</h1> */}
          <h1>
            Your website - inspired by{" "}
            {pokemon.name &&
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
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
                let temp_color =
                  getComputedStyle(root).getPropertyValue("--color1");
                root.style.setProperty(
                  "--color1",
                  getComputedStyle(root).getPropertyValue("--mainDark")
                );
                root.style.setProperty("--mainDark", temp_color);
                if (darkTheme) {
                  root.style.setProperty("--bgURL", "url('" + bgLight + "')");
                } else {
                  root.style.setProperty("--bgURL", "url('" + bgDark + "')");
                }
                darkTheme = !darkTheme;
              }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </section>
        <aside>
          <img
            id="artCanvas"
            src={
              pokemon.sprites &&
              pokemon.sprites.other["official-artwork"].front_default
                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork" +
                  (pokemon.isShiny ? "/shiny/" : "/") +
                  pokemon.id +
                  ".png"
                : //use the Home sprite if the official artwork is not available
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home" +
                  (pokemon.isShiny ? "/shiny/" : "/") +
                  pokemon.id +
                  ".png"
            }
            alt="Pokemon Artwork"
          />
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
          <h2>
            {pokemon.name &&
              pokemon.name.charAt(0).toUpperCase() +
                pokemon.name.slice(1) +
                " [#" +
                (pokemon.national_id ? pokemon.national_id : pokemon.id) +
                "]"}
          </h2>
          <div
            id="types"
            className={
              pokemon.types && pokemon.types.length === 1 ? "singleType" : ""
            }
          >
            <div id="primaryType">
              {pokemon.types && pokemon.types
                ? pokemon.types[0].type.name.charAt(0).toUpperCase() +
                  pokemon.types[0].type.name.slice(1)
                : ""}
            </div>
            <div id="secondaryType">
              {pokemon.types && pokemon.types
                ? pokemon.types[1]
                  ? pokemon.types[1].type.name.charAt(0).toUpperCase() +
                    pokemon.types[1].type.name.slice(1)
                  : ""
                : ""}
            </div>
          </div>
          {pokemon.habitat && pokemon.habitat && pokemon.habitat !== "rare" && (
            <p className="habitat">
              Habitat:{" "}
              {pokemon.habitat
                ? pokemon.habitat.charAt(0).toUpperCase() +
                  pokemon.habitat.slice(1)
                : ""}
            </p>
          )}
          <p className="description">
            {pokemon.flavor_text_entries &&
            pokemon.flavor_text_entries.length ? (
              <FlavorTxtComponent entries={pokemon.flavor_text_entries} />
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="imgWrapper">
          <div
            id="hiddenPkmn"
            style={{
              backgroundImage:
                "url('" +
                (pokemon.sprites.other["official-artwork"].front_default
                  ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork" +
                    (pokemon.isShiny ? "/shiny/" : "/") +
                    pokemon.id +
                    ".png"
                  : //use the Home sprite if the official artwork is not available
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home" +
                    (pokemon.isShiny ? "/shiny/" : "/") +
                    pokemon.id +
                    ".png") +
                "')",
            }}
          ></div>
          {/* Audio element to play the Pokémon's cry */}
          <audio controls id="pkmnCry" key={pokemon.national_id}>
            <source src={"https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/" + pokemon.national_id + ".ogg"} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
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
            Create
            <span className="pokeName">
              {(pokemon.name.charAt(0) === "a" ||
              pokemon.name.charAt(0) === "e" ||
              pokemon.name.charAt(0) === "o" ||
              pokemon.name.charAt(0) === "i" ||
              pokemon.name.charAt(0) === "u"
                ? " an "
                : " a ") +
                pokemon.name.charAt(0).toUpperCase() +
                pokemon.name.slice(1)}
            </span>
            -inspired website
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
      <section id="ballType">
        <h2>Pokeballs based on palette:</h2>
        <p>
          The following Pokeballs are chosen algorithmically based on the
          palette
        </p>
        <div className="ballTypesWrapper">
          {dynamicContent
            .filter((x, i) => i < 3)
            .map((ballType) => (
              <Ball
                ballType={ballType}
                index={dynamicContent.indexOf(ballType) + 1}
              />
            ))}
        </div>
        <p>The following Pokeballs are chosen based on the type</p>
        <div className="ballTypesWrapper">
          {dynamicContent
            .filter((x, i) => i >= 3)
            .filter((x) => x !== "none")
            .map((ballType) => (
              <Ball
                ballType={ballType}
                index={dynamicContent.indexOf(ballType) + 1}
                type={
                  colorList[colorList.findIndex((x) => x[ballType])][ballType]
                    .type
                }
              />
            ))}
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
      <ScreenshotComponent target="otherSlides" ctaTxt="Download Screenshot" />
      <section className="figma" id="otherSlides">
        <div className="gridSection1"></div>
        <div className="gridSection2">
          <div className="figmaLogo">
            <img src={imLogo} alt="Figma Logo" />
            <p>Inkmorphism</p>
          </div>
          <div className="pkmn"></div>
          <div className="sfl">
            <p>
              Save for later
              <BsFillBookmarkFill />
            </p>
          </div>
        </div>
        <div className="gridSection3"></div>
      </section>
      <ScreenshotComponent target="mainSlide" ctaTxt="Download Main Slide" />
      <button
        onClick={() => {
          setIsSpecialEdition(!isSpecialEdition);
        }}
        className="noSelect"
        id="toggleSpecialEdition"
      >
        Toggle Special Edition
      </button>
      <section className="figma" id="mainSlide">
        <div className="gridSection1"></div>
        <div className="gridSection2">
          <div className="figmaLogo">
            <img src={imLogo} alt="Figma Logo" />
            <p>Inkmorphism</p>
          </div>
          <p className={"edition " + (isSpecialEdition ? "visible" : "")}>
            shiny edition ✨
          </p>
          <div className="pkmn"></div>
          <div className="sfl">
            <p>
              Save for later
              <BsFillBookmarkFill />
            </p>
          </div>
        </div>
        <div className="gridSection3"></div>
      </section>
      <footer id="footer">
        <p>
          Copyright © Pokemon Palette 2023<br></br>- by{" "}
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
