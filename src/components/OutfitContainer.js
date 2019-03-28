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
    displayStart: 0,
  }

  displayNextItems = () => {
    let i = this.state.outfits[this.state.outfits.length - 1]

    if (this.state.outfits.slice(this.state.displayStart, this.state.displayStart + 3).includes(i)) {
      this.setState({ displayStart: 0 })
    } else {
      this.setState( prevState => {
        return { displayStart: prevState.displayStart + 3 }
      })
    }

  }

  displayPreviousItems = () => {
    if (this.state.displayStart === 0) {
      (this.state.outfits.length % 3) !== 0  ?
        this.setState({
          displayStart: this.state.outfits.length - this.state.outfits.length % 3
        })
      :
        this.setState({
          displayStart: this.state.outfits.length - 3
        })

    } else {
      this.setState( prevState => {
        return { displayStart: prevState.displayStart - 3 }
      })
    }
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

  addToOutfits = (outfit) => {

    // let newOutfits = [outfit, ...this.state.outfits]

    this.setState( prevState => {
      return {
        displayNewOutfitForm: false,
        outfits: [outfit, ...prevState.outfits]
      }
    }, () => this.props.clearState())
  }


  hideEditForm = (o) => {
    // console.log("what are outfits now?", o);
    this.setState({
      displayEditOutfitForm: false,
      outfits: o
    }, () => this.props.clearState())
  }

  handleEditOutfit = (outfit, items) => {
    // console.log("editing outfit", outfit, items)
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
            addToOutfits={this.addToOutfits}
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
            outfits={this.state.outfits}
            buildingOutfit={this.props.buildingOutfit}
            onDragStart={this.cannotDragItem}
            removeItem={this.removeItem}
            deletedItems={this.state.deletedItems}
            hideEditForm={this.hideEditForm}
          />
        </div>
      )
    } else {
      return (
      <div className="closet-box">
      <h2> my outfits </h2>
      <br/>

        <button className="add-outfit" onClick={this.displayNewOutfitForm}> Create New Outfit </button>
        <br/>

      <img className="left-closet-arrow" src="https://requestreduce.org/images/arrow-clipart-black-and-white-4.png" width="105px" onClick={this.displayPreviousItems}/>
        <br/>
      <img className="right-closet-arrow" src="https://requestreduce.org/images/arrow-clipart-black-and-white-4.png" width="105px" onClick={this.displayNextItems}/>

        <div className="outfits">
        {
          this.state.outfits.slice(this.state.displayStart, this.state.displayStart + 3).map(outfit => {
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
          })
        }
        </div>
      </div>
      )
    }
  }


  render(){
    console.log("current outfits", this.state.outfits)
    return (
      <div>
        {this.renderBottomComponent()}
      </div>
    )
  }


};

export default OutfitContainer
