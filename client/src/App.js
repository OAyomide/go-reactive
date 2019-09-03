import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let mod, inst;

class App extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    WebAssembly.instantiateStreaming(fetch("main.wasm"), window.go.importObject).then(
      result => {
        mod = result.module;
        inst = result.instance;
        document.getElementById("runButton").disabled = false;
      }
    );
  }

  handleClick = async () => {
      await window.go.run(inst);
      inst = await WebAssembly.instantiate(mod, window.go.importObject); // reset instance
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer" 
          >
            Learn React
        </a>
        </header>

        <div>
          <button onClick={(e) => this.handleClick()} id="runButton">Run</button>
          <form>
            <input type="text" name="" id="userInput" />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
