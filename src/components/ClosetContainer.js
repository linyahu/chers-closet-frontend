import React from 'react'
import ItemCard from './ItemCard'
import arrow from './arrow.png'

class ClosetContainer extends React.Component {
  state = {
    displayStart: 0,
  }

  onMouseOver() {
    console.log("will show some buttons appear?");
  }

  displayNextItems = () => {
    let i = this.props.items[this.props.items.length - 1]

    if (this.props.items.slice(this.state.displayStart, this.state.displayStart + 4).includes(i)) {
      this.setState({ displayStart: 0 })
    } else {
      this.setState( prevState => {
        return { displayStart: prevState.displayStart + 4 }
      })
    }
  }

  displayPreviousItems = () => {
    if (this.state.displayStart === 0) {
      (this.props.items.length % 4) !== 0  ?
        this.setState({
          displayStart: this.props.items.length - this.props.items.length % 4
        })
      :
        this.setState({
          displayStart: this.props.items.length - 4
        })

    } else {
      this.setState( prevState => {
        return { displayStart: prevState.displayStart - 4 }
      })
    }
  }

  render(){
    return (
      <div>
      <div className="closet-box">
        <h2> my closet </h2>

        <div className="filter">
        <label>Filter by category </label>
        <select onChange={this.props.filterItems} name="category" value={this.props.category}>
          <option value="">All</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwear">Outerwear</option>
          <option value="dresses">Dresses</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          <option value="handbag">Handbag</option>
        </select>
        </div>


        <button className="add-item" onClick={() => this.props.renderUploadForm()}> Add Item To Closet </button>
        <br/>

        < img className="left-arrow" src="https://requestreduce.org/images/arrow-clipart-black-and-white-4.png" width="105px" onClick={this.displayPreviousItems}/>

        {
          this.props.items.slice(this.state.displayStart, this.state.displayStart + 4).map( item => {
            return (
              <ItemCard
                css={"in-closet"}
                cssImage={"closet-image"}
                key={item.id}
                id={item.id}
                item={item}
                onDragStart={this.props.onDragStart}
                deleteBtn={"delete-btn"}
                deleteItem={this.props.deleteItem}
              />
            )
          })
        }

        < img className="right-arrow" src="https://requestreduce.org/images/arrow-clipart-black-and-white-4.png" width="105px" onClick={this.displayNextItems}/>
        <br/>
        <br/>
        </div>
      </div>
    )
  }


};

export default ClosetContainer
