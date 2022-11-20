import { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';

export default function Example() {
  return (
    <div id="example">
      <main>
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
            <button id="scrollDown">Scroll down ⬇</button>
            <button id="darkMode">Light Mode</button>
          </div>
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
      <div id="cards">
        <div onClick={() => {
            navigator.clipboard.writeText(document.getElementsByClassName("color2")[0].innerHTML);
            }}>
          <div class="color-card"></div>
          <p class="color2"></p>
        </div>
        <div onClick={() => {
            navigator.clipboard.writeText(document.getElementsByClassName("color3")[0].innerHTML);
            }}>
          <div class="color-card"></div>
          <p class="color3"></p>
        </div>
        <div onClick={() => {
            navigator.clipboard.writeText(document.getElementsByClassName("color4")[0].innerHTML);
            }}>
          <div class="color-card"></div>
          <p class="color4"></p>
        </div>
      </div>
      <footer id="footer">
        <p style={{ padding: '20px' }}>Copyright © PokePalette Studio - by <a href='https://github.com/yassenshopov'>Yassen Shopov</a></p>
      </footer>
    </div>
  );
}
