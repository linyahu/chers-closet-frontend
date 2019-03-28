import React, { Component } from 'react'
import ItemCard from './ItemCard'

class EditOutfit extends Component {
  state = {
    description: this.props.outfit.description,
    category: this.props.outfit.category,
    season: this.props.outfit.season,
  }

  /*********************************
          EVENT LISTENERS
  *********************************/

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onMouseOver = () => {
    // console.log("will display an [x] button");
  }

  editOutfit = () => {
    // this creates the outfit "container"
    let data = {
      description: this.state.description,
      category: this.state.category,
      season: this.state.season,
      user_id: this.props.user
    }

    fetch(`http://localhost:3000/outfits/${this.props.outfit.id}`, {
      method: "PATCH",
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
      this.addItems(outfit.id)
      this.deleteItems(outfit.id)
    })
  }

  addItems = (id) => {
    // this creates each outfit-item
    this.props.buildingOutfit.map( item => {

      let data = {
        outfit_id: id,
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
        // console.log("after add items", json)
      })
    })
  }

  deleteItems = (id) => {
   this.props.deletedItems.map( item => {
     let data = {
       outfit_id: id,
       item_id: item.id
     }
     fetch(`http://localhost:3000/outfit_items/${item.id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         "Accepts": "application/json"
       },
       body: JSON.stringify(data)
     })
   })
   this.fetchOutfits()
 }

 deleteOutfit = () => {
   fetch(`http://localhost:3000/outfits/${this.props.outfit.id}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
       "Accepts": "application/json"
     }
   })
   let outfits = this.props.outfits.filter( o => o.id !== this.props.outfit.id)
   this.props.hideEditForm(outfits)
 }

 fetchOutfits = () => {
   fetch("http://localhost:3000/outfits")
   .then( res => res.json())
   .then( json => {
     let outfits = json.filter( outfit => outfit.user_id === this.props.user)
     this.props.hideEditForm(outfits)
   })
 }

renderCurrentItems = () => {
  // console.log("*** is this being rendered?");
  return this.props.currentItems.map( item => {
    return (
      <ItemCard
        css={"item-card"}
        cssImage={"item-image"}
        key={item.id}
        id={item.item_id}
        item={item}
        onDragStart={this.props.onDragStart}
        onMouseOver={this.onMouseOver}
        button="x-button"
        removeItem={this.props.removeItem}
      />
    )
  })
}

renderNewItems = () => {
  // console.log("***inside edit outfit, renderNewItems()", this.props.buildingOutfit);
  return this.props.buildingOutfit.map( item => {
    return (
      <ItemCard
        css={"item-card"}
        cssImage={"item-image"}
        key={item.id}
        id={item.id}
        item={item}
        onDragStart={this.props.onDragStart}
        onMouseOver={this.onMouseOver}
        button="x-button"
        removeItem={this.props.removeItem}
      />
    )
  })
}

  /*********************************
              RENDERS
  *********************************/

  render() {

    // console.log(this.props.currentItems);
    // console.log("new outfit state", this.state);
    // console.log("***inside edit outfit, normal render()", this.props.buildingOutfit);
    console.log("props", this.props);
    return (
      <div className="new-outfit">
        <h1> This will be a edit outfit form </h1>
        <div
          className="drag-and-drop"
          onDragOver={this.props.onDragOver}
          onDrop={this.props.onDrop}
        >
          {
            this.props.currentItems == "" && this.props.buildingOutfit == ""
            ?
            <h2> drag items from closet here </h2>
            :
            <div>
            {this.renderCurrentItems()}
            {this.renderNewItems()}
            </div>

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

        <button onClick={this.editOutfit}> Save outfit </button>
        <button onClick={this.deleteOutfit}> Delete outfit </button>

      </div>
    )
  }

}

export default EditOutfit
