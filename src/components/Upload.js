import React, { Component } from "react";

class Upload extends Component {
  state = {
    description: "",
    category: "",
    // subcategory: "",
    color: "",
    // season: "",
    // keywords: "",
    brand: "",
    image: null,
    imageURL: null,
  };

  handleSubmit = event => {
    event.preventDefault();

    const data = new FormData();

    data.append("user_id", this.props.user)
    data.append("description", this.state.description)
    data.append("category", this.state.category)
    // data.append("subcategory", this.state.subcategory);
    data.append("color", this.state.color)
    // data.append("season", this.state.season)
    // data.append("keywords", this.state.keywords);
    data.append("brand", this.state.brand);
    data.append("image", this.state.image);

    fetch("http://localhost:3000/items", {
      method: "POST",
      body: data,
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ imageURL: json.url });
        window.location.reload()
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileUpload = event => {
    // console.log(event.nativeEvent, event.target.files, event.target.files[0]);
    this.setState({
      image: event.target.files[0],
    });
  };

  render() {

    return (
      <div className="Upload">

        <form onSubmit={this.handleSubmit}>
          <label> Description: </label>
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
          <br />

          <label> Category: </label>
          <select onChange={this.handleChange} name="category" value={this.state.category}>
            <option value="">Select</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="outerwear">Outerwear</option>
            <option value="dresses">Dresses</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
            <option value="handbag">Handbag</option>
          </select>

          <br />

          <label> Color: </label>
          <select onChange={this.handleChange} name="color" value={this.state.color}>
          <option value="">Select</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="gray">Gray</option>
          <option value="brown">Brown</option>
          <option value="tan">Tan</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
          <option value="multi">Multi</option>
          </select>

          <br />


          <label> Brand: </label>
          <input name="brand" type="text" value={this.state.brand} onChange={this.handleChange} />

          <br />

          <input type="file" onChange={this.handleFileUpload} />
          <input type="submit" value="Upload" />
        </form>

        {!!this.state.imageURL ? (
          <img src={this.state.imageURL} alt="img" />
        ) : null}

      </div>
    );
  }
}

export default Upload;

// OLD FORM INPUTS
// <br />
// <label> Sub-Category: </label>
// <input name="subcategory" type="text" value={this.state.subcategory} onChange={this.handleChange} />
// <br />

// <label> Season: </label>
// <select onChange={this.handleChange} name="season" value={this.state.season} >
// <option value="">Select</option>
// <option value="winter">Winter</option>
// <option value="spring">Spring</option>
// <option value="summer">Summer</option>
// <option value="fall">Fall</option>
// </select>

// <label> Keywords: </label>
// <input name="keywords" type="text" value={this.state.keywords} onChange={this.handleChange} />
// <br />
