import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Nav from './Nav/MyNav';
import RouteURL from './RouteURL/RouteURL';
import './Loading.css'


function App() {
  return (
    <Fragment>
      <Suspense fallback="loading">
        <Router>
          <Nav></Nav>
          <RouteURL></RouteURL>
        </Router>
      </Suspense>
    </Fragment>
  );
}

export default App;
