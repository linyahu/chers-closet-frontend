import React from 'react'
import ItemCard from './ItemCard'

// const userId = 1

class ClosetContainer extends React.Component {

  handleMouseOver() {
    console.log("will show some buttons appear?");
  }

  render(){
    console.log("in closet container", this.props.items);
    return (
      <div>
        <h3> MY CLOSET </h3>
        {
          this.props.items.map( item => {
            return (
              <ItemCard
                key={item.id}
                id={item.id}
                item={item}
                onDragStart={this.props.onDragStart}
                handleMouseOver={this.handleMouseOver}
              />
            )
          })
        }
      </div>
    )
  }


};

export default ClosetContainer
