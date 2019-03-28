import React, { Component, Fragment } from 'react';

class Login extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  }

  login = (e) => {
    e.preventDefault()

    this.props.loginUser(this.state.username, this.state.password)
    // console.log("login", this.state.username, this.state.password);
  }

  signupSubmit = (e) => {
    e.preventDefault()
    let data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }
    // console.log("will signup", data);
    this.props.signupUser(data)
  }

  handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderSignUpForm = () => {
    return (
      <div className="signup">
        <form onSubmit={this.signupSubmit}>
          <label>First Name: </label>
          <input onChange={this.handleChange} type="text" name="firstName" value={this.state.firstName}/><br />
          <br />
          <label>Last Name: </label>
          <input onChange={this.handleChange} type="text" name="lastName" value={this.state.lastName}/><br />
          <br />
          <label>Username: </label>
          <input onChange={this.handleChange} type="text"  name="username" value={this.state.username}/><br />
          <br />
          <label>Password: </label>
          <input onChange={this.handleChange} type="password"  name="password" value={this.state.password}/><br />
          <br />
          <br />
          <button type="submit">Create Account</button>
        </form>
      </div>
    )
  }

  renderLoginForm = () => {
    return (
      <div className="login">
        <form onSubmit={this.login}>
          <label>Username: </label>
          <input onChange={this.handleChange} type="text"  name="username" value={this.state.username}/><br />
          <br />
          <label>Password: </label>
          <input onChange={this.handleChange} type="password"  name="password" value={this.state.password}/><br />
          <br />
          <br />
          <button type="submit">Enter My Closet</button>
          <br />
          <br />
          <a onClick={this.props.displaySignup}>Sign up</a>
        </form>

        {
          this.props.errorLogin ?
          <p>Invalid Username or Password</p>
          :
          null
        }
      </div>
    )
  }

  render() {
    // console.log(this.props.typ);
    return (
      <div>
        {
          this.props.type === "login" ?
          this.renderLoginForm()
          :
          this.renderSignUpForm()
        }
      </div>
    )

  }

}

export default Login
