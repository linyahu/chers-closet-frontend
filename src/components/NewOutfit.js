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
    console.log("can't drag");
  }

  createOutfit = () => {
    // this creates the outfit "container"
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
      // console.log(json)
      // then do add items
      this.addItems(outfit)
    })
    // .then( (outfit) => this.props.addToOutfits(outfit) )

  }

  addItems = (outfit) => {
    // this creates each outfit-item
    this.props.currentItems.map( item => {
      let data = {
        outfit_id: outfit.id,
        item_id: item.id
      }
      // console.log(data);
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
        console.log("after add items", json, item)

        if (json.item_id === this.props.currentItems[this.props.currentItems.length - 1].id) {
          console.log("1) &&& this is the last one!");
          this.props.addToOutfits(outfit)
        }
      })
    })

    // window.location.reload()


  }
  /*********************************
              RENDERS
  *********************************/

  render() {
    // console.log(this.props.currentItems);
    console.log("new outfit state", this.state);
    return (
      <div className="new-outfit">
        <h1> This will be a new outfit form </h1>
        <div
          onDragOver={this.props.onDragOver}
          onDrop={this.props.onDrop}
          className="drag-and-drop"
        >
          {
            this.props.currentItems == ""
            ?
            <h2> drag items from closet here </h2>
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
          <select onChange={this.handleChange} name="category" value={this.state.category}>
            <option value="">Select</option>
            <option value="casual">Casual</option>
            <option value="work">Work</option>
            <option value="evening">Evening</option>
            <option value="active">Active</option>
            <option value="other">Other</option>
          </select>

          <br />

          <label> Season: </label>
          <select onChange={this.handleChange} name="season" value={this.state.season} >
            <option value="">Select</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>

        </form>

        <button onClick={this.createOutfit}> Save outfit </button>

      </div>
    )
  }

}

export default NewOutfit
