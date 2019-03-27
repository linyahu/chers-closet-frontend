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
    currentItems: [], // contains the items that are ALREADY in the outfit that you are trying to edit
    deletedItems: [],
  }

  displayNewOutfitForm = () => {
    let toggleForm = !this.state.displayNewOutfitForm
    this.setState({ displayNewOutfitForm: toggleForm })
  }

  removeItem = (item) => {
    // remove this item from either currentItems or in buildingOutfit
    if (this.state.currentItems.includes(item)) {
      this.setState( prevState => {
        return {
          deletedItems: [...prevState.deletedItems, item],
          currentItems: prevState.currentItems.filter( i => i !== item)
        }
      })
      this.props.removeFromCurrentOutfitItems(item)
    } else if (this.props.buildingOutfit.includes(item)) {
      // console.log("will remove from the new outfit items");
      this.props.removeFromBuildingOutfit(item)
    }

  }

  handleEditOutfit = (outfit, items) => {
    console.log("editing outfit", outfit, items)
    let toggleEditOutfit = !this.state.displayEditOutfitForm
    this.setState({
      displayEditOutfitForm: toggleEditOutfit,
      displayNewOutfitForm: false,
      editCurrentOutfit: outfit,
      currentItems: items
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

  cannotDragItem() {
    console.log("can't drag this!");
  }

  noMouseOver() {
    console.log("no mouse over");
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
            onDragStart={this.cannotDragItem}
            removeItem={this.removeItem}
          />
        </div>
      )
    } else if (this.state.displayEditOutfitForm === true ) {
      return (
        <div>
          <EditOutfit
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            currentItems={this.state.currentItems}
            user={this.props.user}
            outfit={this.state.editCurrentOutfit}
            buildingOutfit={this.props.buildingOutfit}
            onDragStart={this.cannotDragItem}
            removeItem={this.removeItem}
            deletedItems={this.state.deletedItems}
          />
        </div>
      )
    } else {
      return (
      <div>
        <button onClick={this.displayNewOutfitForm}> Create New Outfit </button>
        {this.state.outfits.map(outfit => {
          return (
            <OutfitCard
              key={outfit.id}
              id={outfit.id}
              outfit={outfit}
              handleEditOutfit={this.handleEditOutfit}
              onDragStart={this.cannotDragItem}
              onMouseOver={this.noMouseOver}
            />
          )
        })}
      </div>
      )
    }
  }


  render(){
    // console.log("current ouftis", this.state.outfits)
    // console.log("deletedItems", this.state.deletedItems);
    // console.log("what are the props in here again? outfit container", this.props);
    console.log("all the items we have rihgt now", this.state.currentItems, this.props.buildingOutfit);
    return (
      <div>
        <h1> OUTFITS </h1>
        {this.renderBottomComponent()}
      </div>
    )
  }


};

export default OutfitContainer
