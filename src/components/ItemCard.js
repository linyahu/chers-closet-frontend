import React, { Component, Fragment } from 'react'

class ItemCard extends React.Component {
  state = {
    src: "https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg",
    edit: false,
  }

  editItem = (item) => {
    console.log("edit this item", item)
    this.setState({ edit: true })
  }

  componentDidMount() {
    fetch(`http://localhost:3000/items/${this.props.id}`)
    .then( res => res.json())
    .then( item => {
      // console.log("rendering itemcard for", item);
      this.setState({ src: item.url })
    })
  }

  renderEdit() {
    if (this.state.edit) {
      return (
        <Fragment>
          <span className="item-image">
            <p> does this thing work </p>
            <p> do i have access to props? </p>
            <p> Description{this.props.item.description} </p>
          </span>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <button
            className={this.props.button || "hidden-button"}
            onClick={ () => this.props.removeItem(this.props.item) }
            >X</button>
          <img
            className="item-image"
            src={this.state.src}
            alt="fun pic"
          />
        </Fragment>
      )
    }
  }


  render(){
    return(
      <div
        className={this.props.css}
        onDragStart={ () => this.props.onDragStart(this.props.item) }
      >
        <button
          className={this.props.button || "hidden-button"}
          onClick={ () => this.props.removeItem(this.props.item) }
        >X</button>
        <img
          className={this.props.cssImage}
          src={this.state.src}
          alt="fun pic"
        />
      <button
      className={this.props.deleteBtn || "hidden-button"}
      onClick={ () => this.props.deleteItem(this.props.item) }
      >Delete</button>
      </div>
    )
  }

}

export default ItemCard

// onMouseOver={ () => this.props.onMouseOver() }
