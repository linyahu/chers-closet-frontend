import React from 'react'
import ItemCard from './ItemCard'

class ClosetContainer extends React.Component {
  state = {
    displayStart: 0,
    maxStart: 0,
    // lastItem: this.props.items[this.props.items.length - 1]
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
      this.setState({
        displayStart: this.props.items.length - this.props.items.length % 4
      })
    } else {
      this.setState( prevState => {
        return { displayStart: prevState.displayStart - 4 }
      })
    }
  }

  showEdit = () => {

  }

  render(){
    // console.log("in closet container", this.props.items.slice(this.state.displayStart, this.state.displayStart + 4));
    // console.log("max start?", this.props.items.length - this.props.items.length % 4);
    // console.log("items in closet", this.findLastItem());
    return (
      <div>
        <h3> MY CLOSET </h3>
        <button onClick={this.displayPreviousItems}> Previous </button>
        {
          this.props.items.slice(this.state.displayStart, this.state.displayStart + 4).map( item => {
            return (
              <ItemCard
                key={item.id}
                id={item.id}
                item={item}
                onDragStart={this.props.onDragStart}
                button={"edit-btn"}
              />
            )
          })
        }
        <button onClick={this.displayNextItems}> Next </button>
      </div>
    )
  }


};

export default ClosetContainer
