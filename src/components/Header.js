import React from 'react'

class Header extends React.Component {

  render(){
    return (
      <div>
      <h1> chers closet </h1>
      <p> nav bar </p>
      <button onClick={() => this.props.renderUploadForm()}> Add Item To Closet </button>
      </div>
    )
  }


};

export default Header
