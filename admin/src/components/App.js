import React, { Component } from 'react';
import { BrowserRouter as Router} from "react-router-dom";

import Navbar from './Navbar';
import Footer from './Footer';

import Routerconfig from '../router/Routerconfig';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routerconfig />
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
