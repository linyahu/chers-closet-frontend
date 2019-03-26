import React from 'react'
import ItemCard from './ItemCard'

// const userId = 1

class ClosetContainer extends React.Component {
  // state = {
  //   items: [],
  // }
  //
  // componentDidMount() {
  //   fetch("http://localhost:3000/items")
  //   .then(res => res.json())
  //   .then( json => {
  //     let items = json.filter( item => {
  //       return item.user_id == userId
  //     })
  //     this.setState({ items })
  //   })
  // }

  render(){
    // console.log(this.state.items);
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
              />
            )
          })
        }
      </div>
    )
  }


};

export default ClosetContainer
