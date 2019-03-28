import React from 'react'

class Header extends React.Component {

  render(){
    return (
      <div>
      <br/>
      <br/>
      < img className="chers" src={process.env.PUBLIC_URL + '/chers.png'} />
      </div>
    )
  }


};

export default Header


// <button onClick={() => this.props.renderUploadForm()}> Add Item To Closet </button>
