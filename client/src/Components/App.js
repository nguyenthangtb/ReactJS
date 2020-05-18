import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Nav from './Nav/MyNav';
import RouteURL from './RouteURL/RouteURL';
import './Loading.css'


function App() {
  return (
    <div>
      <Router>
        <Nav></Nav>
        <RouteURL></RouteURL>
      </Router>
    </div>
  );
}

export default App;
