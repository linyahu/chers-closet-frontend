import React, { Component } from 'react';
import logo from './logo.svg';
import Upload from "./components/Upload"
import OutfitContainer from "./components/OutfitContainer"
import ClosetContainer from "./components/ClosetContainer"
import Header from "./components/Header"
import './App.css';

const userId = 1

class App extends Component {

  state = {
    items: [],
    displayUploadForm: false
  }

  renderUploadForm = () => {
    let toggleForm = !this.state.displayUploadForm
    this.setState({
      displayUploadForm: toggleForm
    })
  }


  componentDidMount() {
    fetch("http://localhost:3000/items")
    .then(res => res.json())
    .then( json => {
      let items = json.filter( item => {
        return item.user_id == userId
      })
      this.setState({ items })
    })
  }


  render() {
    return (

      <div className="App">
        <Header renderUploadForm={this.renderUploadForm} />
        {this.state.displayUploadForm ? <Upload /> : null}
        <ClosetContainer items={this.state.items}/>
        <OutfitContainer />

      </div>
    );
  }
}

export default App;
