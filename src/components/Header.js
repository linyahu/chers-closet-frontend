import React from 'react'

class Header extends React.Component {

  render(){
    return (
      <div>
        {
          this.props.user !== null ?
          <button onClick={this.props.handleLogout}>Logout</button>
          :
          null
        }
        <div>
          <img
            className="chers"
            src={process.env.PUBLIC_URL + '/pinklogo.png'}
            alt="cher's closet logo"
            />
        </div>
      </div>
    )
  }


};

export default Header
