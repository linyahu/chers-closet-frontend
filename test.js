import React, { Component } from "react";

class Upload extends Component {
  state = {
    name: "",
    // description: "",
    // category: "",
    // subCategory: "",
    // color: "",
    // season: "",
    // occasion: "",
    // keywords: "",
    // brand: "",
    image: null,
    imageURL: null,
  };

  handleSubmit = event => {
    debugger
    event.preventDefault();

    const data = new FormData();

    data.append("user_id", 1)
    // data.append("description", this.state.description)
    // data.append("color", this.state.color)
    // data.append("season", this.state.season)

    // let data = {
    //   description: this.state.description,
    //   category: this.state.category,
    //   subCategory: this.state.subCategory,
    //   color: this.state.color,
    //   season: this.state.season,
    //   occasion: this.state.occasion,
    //   keywords: this.state.keywords,
    //   brand: this.state.brand,
    //   image: this.state.image,
    //   user_id: 1
    // }


    // data.append()
    // data.append("user_id", 1)
    // data.append("name", this.state.name);
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
    console.log(this.state)
    return (
      <div className="Upload">
        <form onSubmit={this.handleSubmit}>

        <label> Description: </label>
          <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />


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


/*  <label> Category: </label>
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

    <label> Sub-Category: </label>
      <input name="subCategory" type="text" value={this.state.subCategory} onChange={this.handleChange} />

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
        </select>

        <label> Season: </label>
          <select onChange={this.handleChange} name="season" value={this.state.season} >
            <option value="">Select</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>

        <label> Occasion: </label>
          <input name="occasion" type="text" value={this.state.occasion} onChange={this.handleChange} />

    <label> Brand: </label>
    <input name="brand" type="text" value={this.state.brand} onChange={this.handleChange} />

    <label> Keywords: </label>
    <input name="keywords" type="text" value={this.state.keywords} onChange={this.handleChange} />
    */
