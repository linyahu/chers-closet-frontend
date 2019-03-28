import React, { Component } from 'react'
import ItemCard from './ItemCard'

class NewOutfit extends Component {
  state = {
    description: "",
    category: "",
    occasion: "",
    season: "",
  }

  /*********************************
          EVENT LISTENERS
  *********************************/

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onDragStart() {
  }

  createOutfit = () => {
    let data = {
      description: this.state.description,
      category: this.state.category,
      season: this.state.season,
      user_id: this.props.user
    }

    fetch("http://localhost:3000/outfits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then( outfit => {
      this.addItems(outfit)
    })


  }

  addItems = (outfit) => {
    // this creates each outfit-item
    this.props.currentItems.map( item => {
      let data = {
        outfit_id: outfit.id,
        item_id: item.id
      }
      fetch("http://localhost:3000/outfit_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then( json => {

        if (json.item_id === this.props.currentItems[this.props.currentItems.length - 1].id) {
          this.props.addToOutfits(outfit)
        }
      })
    })

  }
  /*********************************
              RENDERS
  *********************************/

  render() {
    return (
      <div className="new-outfit">
        <h2> style a new outfit </h2>
        <div
          onDragOver={this.props.onDragOver}
          onDrop={this.props.onDrop}
          className="drag-and-drop"
        >
          {
            this.props.currentItems == ""
            ?
            <h3> d r a g  - i t e m s - f r o m - c l o s e t - h e r e </h3>
            :
            this.props.currentItems.map( item => {
              return (
                <ItemCard
                  css={"item-card"}
                  cssImage={"item-image"}
                  button="x-button"
                  key={item.id}
                  id={item.id}
                  item={item}
                  onDragStart={this.onDragStart}
                  removeItem={this.props.removeItem}
                  // handleMouseOver={this.props.handleMouseOver}
                />
              )
            })
          }
        </div>
        <form>

          <label> Description: </label>
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />

          <br />

          <label> Category: </label>
          <select className="cat" onChange={this.handleChange} name="category" value={this.state.category}>
            <option value="">Select</option>
            <option value="casual">Casual</option>
            <option value="work">Work</option>
            <option value="evening">Evening</option>
            <option value="active">Active</option>
            <option value="other">Other</option>
          </select>

          <br />

          <label> Season: </label>
          <select className="sn" onChange={this.handleChange} name="season" value={this.state.season} >
            <option value="">Select</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>

        </form>

        <button className="save" onClick={this.createOutfit}> Save outfit </button>

      </div>
    )
  }

}

export default NewOutfit
