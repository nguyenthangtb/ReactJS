import React, { Component } from 'react';




class App1 extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Title</h4>
          <h6 className="card-subtitle text-muted">Subtitle</h6>
        </div>
        <img src="holder.js/100x180/" alt="" />
        <div className="card-body">
          <p className="card-text">Text</p>
          <a href="#" className="card-link">Link 1</a>
          <a href="#" className="card-link">Link 2</a>
        </div>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <App1 />
    </div>
  );
}



export default App;

