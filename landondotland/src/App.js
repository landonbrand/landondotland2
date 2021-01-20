import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from "./routes/About.js";
import Tunes from "./routes/Tunes.js";
import Tune from "./routes/Tune.js";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="outermost">
        <div className="hero">
          <h1>Landon.land</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/tunes">Tunes</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/tunes">
            <Tunes />
          </Route>
          <Route path="/tune/:id">
            <Tune />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}