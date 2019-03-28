import React from 'react'
import ItemCard from './ItemCard'

class OutfitCard extends React.Component{
  // outfit card will render the outfit for that specific outfit id
  // state = {
  //   items: [],
  // }

  componentDidMount() {
    fetch("http://localhost:3000/outfit_items")
    .then(res => res.json())
    .then( json => {
      let items = json.filter( item => item.outfit_id === this.props.id)
      this.setState({ items })
    })
  }

  renderItems() {
    let items = this.props.outfitItems.filter( oi => oi.outfit_id === this.props.id )

    return items.map( item => {
      return (
        <ItemCard
          key={item.item_id}
          id={item.item_id}
          item={item}
          onDragStart={this.props.onDragStart}
          onMouseOver={this.props.onMouseOver}
          />
      )
    })
  }

  render(){
    console.log("props down to outfit card", this.props.outfitItems);
    // console.log("then what is state down here?", this.state.items);
    return(
      <div className="outfitcard">
        <p> this is outfit {this.props.id} </p>
        <button onClick={() => this.props.handleEditOutfit(this.props.outfit, this.state.items)} >
          Edit Outfit
        </button>
        <p> Description: {this.props.outfit.description}</p>

        {
          this.renderItems()
        }

      </div>
    )
  }

}

export default OutfitCard
