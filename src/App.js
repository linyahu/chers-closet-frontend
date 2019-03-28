import React, { Component, Fragment } from 'react';
import logo from './logo.svg';

import Upload from "./components/Upload"
import OutfitContainer from "./components/OutfitContainer"
import ClosetContainer from "./components/ClosetContainer"
import Header from "./components/Header"


import './App.css';

class App extends Component {

  state = {
    user: 1,
    items: [],
    outfitItems: [], // gets passed down to the outfitcard to render the items in the outfit
    displayUploadForm: false,
    draggedItem: {},
    buildingOutfit: [], // will just contain items that are dropped into the div
    currentOutfitItems: [], // just the ids --> to make sure you can't add the same item twice
    // reset: false,
  }


  clearState = () => {
    this.fetchOutfitItems()
    this.setState({
      draggedItem: {},
      buildingOutfit: [],
      currentOutfitItems: [],
    })
  }

  /*********************************
          EVENT LISTENERS
  *********************************/

  renderUploadForm = () => {
    let toggleForm = !this.state.displayUploadForm
    this.setState({ displayUploadForm: toggleForm })
  }

  onDragStart = (item) => {
    this.setState({ draggedItem: item })
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = () => {
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

    this.fetchOutfitItems()
  }

  deleteItem = (item) => {
    console.log("gonna delete this item", item);

    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    this.rerenderItems(item)
  }

  /*********************************
              FETCHES
  *********************************/
  fetchOutfitItems = () => {
    fetch("http://localhost:3000/outfit_items")
    .then( res => res.json())
    .then( outfitItems => {
      this.setState({ outfitItems })
    })
  }

  /*********************************
              RENDERS
  *********************************/
  rerenderItems = (item) => {
    let toggle = !this.state.reset
    let newItems = this.state.items.filter( i => i.id != item.id)
    let newOutfitItems = this.state.outfitItems.filter( oi => oi.item_id != item.id)
    this.setState({
      items: newItems,
      outfitItems: newOutfitItems
    })
  }

  render() {
    console.log("outfits", this.state.outfits);

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
              rerenderItems={this.rerenderItems}
              deleteItem={this.deleteItem}
            />

            <OutfitContainer
              user={this.state.user}
              outfitItems={this.state.outfitItems}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              buildingOutfit={this.state.buildingOutfit}
              handleEditOutfit={this.handleEditOutfit}
              selectCurrentOutfit={this.selectCurrentOutfit}
              removeFromBuildingOutfit={this.removeFromBuildingOutfit}
              removeFromCurrentOutfitItems={this.removeFromCurrentOutfitItems}
              clearState={this.clearState}
            />


          </Fragment>
        }



      </div>
    );
  }
}

export default App;
