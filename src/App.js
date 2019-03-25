import React, { Component } from 'react';
import logo from './logo.svg';
import Upload from "./components/Upload"
import OutfitContainer from "./components/OutfitContainer"
import ClosetContainer from "./components/ClosetContainer"
import Header from "./components/Header"
import './App.css';

class App extends Component {
  render() {
    return (

      <div className="App">
        <Header />
        <Upload />
        <ClosetContainer />
        <OutfitContainer />

      </div>
    );
  }
}

export default App;
