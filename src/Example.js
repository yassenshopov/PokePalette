import React, { useState, useEffect } from 'react';
import { GiAbstract006 } from "react-icons/gi";

export default function Example() {
  return (
    <div id="example">
      <nav id="nav">
        <GiAbstract006 id="logo" style={{fontSize: '50px', padding: '20px'}} />
      </nav>
      <main>
        <section id="section">
          <h1>Lorem ipsum website</h1>
          <p>Start with your closest colleagues, since these are the people who you know the best and will be sure to reciprocate. After endorsing your closest colleagues, endorse the skills of those you met at important functions or during your time spent at work, such as clients, vendors, or freelancers.</p>
        </section>
        <aside>
            <article id="gradientArticle"></article>
        </aside>
      </main>
      <footer id="footer">
        <p style={{padding: '20px'}}>Copyright © PokePalette Studio</p>
      </footer>
    </div>
  );
}
