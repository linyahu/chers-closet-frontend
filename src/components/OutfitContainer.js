import React from 'react'
import OutfitCard from './OutfitCard'
import NewOutfit from "./NewOutfit"
import EditOutfit from "./EditOutfit"

class OutfitContainer extends React.Component {
  // 1. get all outfits that belong to the user....
  // 2. set state for outfit items --> pass down the ids into the item card
  //        map somehow?
  state = {
    outfits: [], // has all the outfits that belong to the user (user 1)
    displayNewOutfitForm: false,
    displayEditOutfitForm: false,
    editCurrentOutfit: {},
    editOutfitItems: []
  }

  displayNewOutfitForm = () => {
    let toggleForm = !this.state.displayNewOutfitForm
    this.setState({ displayNewOutfitForm: toggleForm })
  }

  handleEditOutfit = (outfit, items) => {
    console.log("editing outfit", outfit, items)
    let toggleEditOutfit = !this.state.displayEditOutfitForm
    this.setState({
      displayEditOutfitForm: toggleEditOutfit,
      displayNewOutfitForm: false,
      editCurrentOutfit: outfit,
      editOutfitItems: items
    })
    this.props.selectCurrentOutfit(items)
  }

  componentDidMount() {
    fetch("http://localhost:3000/outfits")
    .then( res => res.json())
    .then( json => {
      let outfits = json.filter( outfit => outfit.user_id === this.props.user)
      this.setState({ outfits })
    })
  }

  /*********************************
              RENDERS
  *********************************/

  renderBottomComponent = () => {
    if (this.state.displayNewOutfitForm === true) {
      return  (
        <div>
          <NewOutfit
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            currentItems={this.props.buildingOutfit}
            user={this.props.user}
          />
        </div>
      )
    } else if (this.state.displayEditOutfitForm === true ) {
      return (
        <div>
          <EditOutfit
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            currentItems={this.state.editOutfitItems}
            user={this.props.user}
            outfit={this.state.editCurrentOutfit}
            buildingOutfit={this.props.buildingOutfit}
          />
        </div>
      )
    } else {
      return (
      <div>
        <button onClick={this.displayNewOutfitForm}> Create New Outfit </button>
        {this.state.outfits.map(outfit => {
          return <OutfitCard key={outfit.id} id={outfit.id} outfit={outfit} handleEditOutfit={this.handleEditOutfit}/>
        })}
      </div>
      )
    }
  }


  render(){
    console.log("current ouftis", this.state.outfits)
    return (
      <div>
        <h1> OUTFITS </h1>
        {this.renderBottomComponent()}
      </div>
    )
  }


};

export default OutfitContainer
