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
    console.log("outfitcard items", this.state.items);
    return(
      <div className="outfitcard">
        <p> this is outfit {this.props.id} </p>
        {
          this.state.items.map( item => {
            return <ItemCard key={item.id} id={item.id} item={item} />
          })
        }

      </div>
    )
  }

}

export default OutfitCard
