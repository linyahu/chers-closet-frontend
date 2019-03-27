import React from 'react'

class ItemCard extends React.Component {
  state = {
    src: "",
  }

  componentDidMount() {
    fetch(`http://localhost:3000/items/${this.props.id}`)
    .then( res => res.json())
    .then( item => {
      // console.log("rendering itemcard for", item);
      this.setState({ src: item.url })
    })
  }

  render(){
    // console.log("item card", this.props);
    // console.log("state in item card", this.state.src);
    return(
        <img
          src={this.state.src}
          alt="fun pic"
          height="150px"
          width="130px"
          onDragStart={ () => this.props.onDragStart(this.props.item) }

        />
    )
  }

}

export default ItemCard

// onMouseOver={ () => this.props.handleMouseOver() }
