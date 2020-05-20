import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class App extends Component {

  
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }
  
  render(){
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            Click me to upload a file!
          </div>
        )}
      </Dropzone>
    )
  }
}

export default App;
