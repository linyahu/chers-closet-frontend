import React from 'react'
import ItemCard from './ItemCard'

class OutfitCard extends React.Component{
  // outfit card will render the outfit for that specific outfit id
  state = {
    items: [],
  }

  componentDidMount() {
    fetch("http://localhost:3000/outfit_items")
    .then(res => res.json())
    .then( json => {
      let items = json.filter( item => item.outfit_id === this.props.id)
      this.setState({ items })
    })
  }

  render(){

    // console.log(`items in outfit #${this.props.id}:`, this.state.items);

    return(
      <div className="outfitcard">
        Outfit: {this.props.outfit.description}
        <br/>
        {
          this.state.items.map( item => {
            return (
              <ItemCard
                css={"in-outfit"}
                cssImage={"outfit-image"}
                key={item.item_id}
                id={item.item_id}
                item={item}
                onDragStart={this.props.onDragStart}
                onMouseOver={this.props.onMouseOver}
              />
            )
          })
        }
        <br/>
        <br/>
        <button onClick={() => this.props.handleEditOutfit(this.props.outfit, this.state.items)} >
        Edit Outfit
        </button>


      </div>
    )
  }

}

export default OutfitCard



// <p> this is outfit {this.props.id} </p>
