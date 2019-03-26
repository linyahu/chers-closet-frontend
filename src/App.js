import React, { Component, Fragment } from 'react';
import logo from './logo.svg';

import Upload from "./components/Upload"
import OutfitContainer from "./components/OutfitContainer"
import ClosetContainer from "./components/ClosetContainer"
import Header from "./components/Header"


import './App.css';

// const userId = 1

class App extends Component {

  state = {
    user: 1,
    items: [],
    displayUploadForm: false,
    draggedItem: {},
    buildingOutfit: [], // will just contain items that are dropped into the div
  }

  /*********************************
          EVENT LISTENERS
  *********************************/

  renderUploadForm = () => {
    let toggleForm = !this.state.displayUploadForm
    this.setState({ displayUploadForm: toggleForm })
  }

  onDragStart = (item) => {
    // console.log("dragging object", item);
    this.setState({ draggedItem: item })
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = () => {
    console.log("gonna drop");
    this.setState( prevState => {
      return { buildingOutfit: [...prevState.buildingOutfit, this.state.draggedItem] }
    })
  }

  /*********************************
          LIFECYCLE METHODS
  *********************************/
  componentDidMount() {
    fetch("http://localhost:3000/items")
    .then(res => res.json())
    .then( json => {
      let items = json.filter( item => {
        return item.user_id === this.state.user
      })
      this.setState({ items })
    })
  }

  /*********************************
              RENDERS
  *********************************/

  render() {
    // console.log("dragged item", this.state.draggedItem);
    console.log("buildingOutfit", this.state.buildingOutfit);

    return (

      <div className="App">
        <Header
          renderUploadForm={this.renderUploadForm}

        />

        {
          this.state.displayUploadForm
          ?
          <Upload user={this.state.user} />
          :
          <Fragment>
            <ClosetContainer
              user={this.state.user}
              items={this.state.items}
              onDragStart={this.onDragStart}
            />

            <OutfitContainer
              user={this.state.user}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              buildingOutfit={this.state.buildingOutfit}
            />


          </Fragment>
        }



      </div>
    );
  }
}

export default App;
