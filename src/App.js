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
    currentOutfitItems: [], // just the ids --> to make sure you can't add the same item twice
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
    // console.log("buildingOutfit", this.state.buildingOutfit);
    // console.log("true or false?", !this.state.buildingOutfit.includes(this.state.draggedItem) && !this.state.currentOutfitItems.includes(this.state.draggedItem.id));
    let _this = this
    // debugger
    if (!this.state.buildingOutfit.includes(this.state.draggedItem) && !this.state.currentOutfitItems.includes(this.state.draggedItem.id)) {
      this.setState( prevState => {
        return { buildingOutfit: [...prevState.buildingOutfit, this.state.draggedItem] }
      })
    }
  }


  selectCurrentOutfit = (items) => {
    // console.log("selectCurrentOutfit", items);
    let itemIds = items.map( i => i.item_id)
    this.setState({ currentOutfitItems: itemIds })
  }

  removeFromBuildingOutfit = (item) => {
    // console.log("will remove from building outfit", item);
    this.setState( prevState => {
      return {buildingOutfit: prevState.buildingOutfit.filter( i => i !== item)}
    })
  }

  removeFromCurrentOutfitItems = (item) => {
    this.setState( prevState => {
      return { currentOutfitItems: prevState.currentOutfitItems.filter(i => i !== item.item_id) }
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
    // console.log("items in App", this.state.items);
    // console.log("current outfit items", this.state.currentOutfitItems);
    console.log("building outfit", this.state.buildingOutfit, "currentOutfitItems", this.state.currentOutfitItems);

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
              handleEditOutfit={this.handleEditOutfit}
              selectCurrentOutfit={this.selectCurrentOutfit}
              removeFromBuildingOutfit={this.removeFromBuildingOutfit}
              removeFromCurrentOutfitItems={this.removeFromCurrentOutfitItems}
            />


          </Fragment>
        }



      </div>
    );
  }
}

export default App;
