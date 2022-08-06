import React from 'react';
import './app.css'
import s from './app.module.css'
import NavBar from "./Nav/NavBar";
import SectionStart from "./SectionStart/SectionStart";
import SectionGetRequest from "./SectionGetRequest/SectionGetRequest";
import SectionPostRequest from "./SectionPostRequest/SectionPostRequest";

function App() {
  return (
    <div className="App">
        <div className={s.appDiv}>
            <header>
                <NavBar/>
            </header>
            <main>
                <article>
                    <SectionStart/>
                    <SectionGetRequest/>
                    <SectionPostRequest/>
                </article>
            </main>
        </div>

    </div>
  );
}

export default App;
