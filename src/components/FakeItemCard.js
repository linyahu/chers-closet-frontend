import React, { Component, Fragment } from 'react'

class FakeItemCard extends Component {

  render() {
    return (
      <div className="in-closet">
        <button
          className={this.props.button || "hidden-button"}
        >X</button>

        <img
          className="fake-closet-image"
          src="https://rlv.zcache.co.uk/add_image_here_customizable_design_create_your_own_postcard-r713f152f597f4e47b56c30f784af59f0_vgbaq_8byvr_307.jpg"
          alt="fun pic"
        />
        <button
        className={this.props.deleteBtn || "hidden-button"}
        >Delete</button>

      </div>
    )
  }

}

export default FakeItemCard
