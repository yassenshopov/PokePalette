import { FaReact } from "react-icons/fa";

export default function Example() {

  return (
    <div id="example">

      <main>
        <div id="backdrop"></div>

        <section id="section">
          <h1>Your website - inspired by colours</h1>
          <p>This page was built with <strong>React</strong> < FaReact id="faReact" /></p>
          <p>It allows you to enter a Pokemon's name (or simply its number in the Pokedex), and its top 3 colours will be extracted.</p>
        <button id="scrollDown">Scroll down ⬇</button>
        <button id="darkMode">Dark Mode</button>
        
        </section>
        <aside>
            <article id="gradientArticle">
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>

              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>

              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>

              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>

              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
              <div class="gridItem"></div>
            </article>
        </aside>
      </main>
      <div id="cards"></div>
      <footer id="footer">
        <p style={{padding: '20px'}}>Copyright © PokePalette Studio</p>
      </footer>
    </div>
  );
}
