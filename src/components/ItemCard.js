import React from 'react'

class ItemCard extends React.Component {
  state = {
    src: "",
  }

  componentDidMount() {
    fetch(`http://localhost:3000/items/${this.props.id}`)
    .then( res => res.json())
    .then( item => {
      this.setState({ src: item.url })
    })
  }

  render(){
    // console.log("item card", this.props.id);
    console.log("state in item card", this.state.src);
    return(
      <img src={this.state.src} alt="fun pic" />
    )
  }

}

export default ItemCard
