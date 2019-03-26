import React from 'react'
import OutfitCard from './OutfitCard'
import NewOutfit from "./NewOutfit"

class OutfitContainer extends React.Component {
  // 1. get all outfits that belong to the user....
  // 2. set state for outfit items --> pass down the ids into the item card
  //        map somehow?
  state = {
    outfits: [], // has all the outfits that belong to the user (user 1)
    displayNewOutfitForm: false,
  }

  displayNewOutfitForm = () => {
    let toggleForm = !this.state.displayNewOutfitForm
    this.setState({ displayNewOutfitForm: toggleForm })
  }

  componentDidMount() {
    fetch("http://localhost:3000/outfits")
    .then( res => res.json())
    .then( json => {
      let outfits = json.filter( outfit => outfit.user_id === this.props.user)
      this.setState({ outfits })
    })
  }


  render(){
    return (
      <div>
        <h1> OUTFITS </h1>
        <button onClick={this.displayNewOutfitForm}> Create New Outfit </button>

        {
          this.state.displayNewOutfitForm ?
          <NewOutfit
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            currentItems={this.props.buildingOutfit}
            user={this.props.user}
          />
          :
          this.state.outfits.map( outfit => {
            return <OutfitCard key={outfit.id} id={outfit.id} outfit={outfit}/>
          })
        }
      </div>
    )
  }


};

export default OutfitContainer
