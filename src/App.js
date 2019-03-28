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
    allItems: [],
    items: [],
    displayUploadForm: false,
    draggedItem: {},
    buildingOutfit: [], // will just contain items that are dropped into the div
    currentOutfitItems: [], // just the ids --> to make sure you can't add the same item twice
    category: ""
  }

  filterItems = (e) => {
    console.log("will filter items", e.target.name, e.target.value);
    let filteredItems = this.state.allItems.filter( i => i.category === e.target.value)
    console.log(filteredItems);

    e.target.value === "" ?
    this.setState({
      category: "",
      items: this.state.allItems
    })
    :
    this.setState({
      category: e.target.value,
      items: filteredItems
    })
  }


  clearState = () => {
    this.setState({
      draggedItem: {},
      buildingOutfit: [],
      currentOutfitItems: [],
    })
  }

  deleteItem = (item) => {
    console.log("gonna delete this item", item, "from", this.state.items);
    // reset state in my items
    // also hit the backend on the delete fetch
    this.fetchDeleteItem(item.id)
    // this.fetchOutfitItems()
    window.location.reload()
    // currently will have to force a reload of the page...
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
    LIFECYCLE METHODS / FETCHES
  *********************************/
  componentDidMount() {
    fetch("http://localhost:3000/items")
    .then(res => res.json())
    .then( json => {
      let items = json.filter( item => {
        return item.user_id === this.state.user
      })
      this.setState({ items, allItems: items })
    })
  }

  fetchDeleteItem = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    .then()
  }

  fetchOutfitItems = () => {
    fetch("http://localhost:3000/outfit_items")
    .then(res => res.json())
    .then( json => {
      console.log("fetching outfit items after deleting an item", json);
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
              deleteItem={this.deleteItem}
              renderUploadForm={this.renderUploadForm}
              filterItems={this.filterItems}
              category={this.state.category}
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
              clearState={this.clearState}
            />


          </Fragment>
        }



      </div>
    );
  }
}

export default App;
