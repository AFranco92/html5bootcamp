import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addMovie } from "../actions/index";
import { Link } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return {
    addMovie: movie => dispatch(addMovie(movie))
  };
}

class ConnectedForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let moviename = document.getElementById("moviename").value;
    let movieyear = document.getElementById("movieyear").value;
    let movieduration = document.getElementById("movieduration").value;
    const newmovie = {
      id: uuidv1(),
      name: moviename,
      year: movieyear,
      duration: movieduration,
      isfavorite: false,
      editable: false,
    };
    this.props.addMovie(newmovie);
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit}>
        <input id="moviename" type="text" placeholder="Choose a name"></input>
        <input id="movieyear" type="number" placeholder="Choose a year"></input>
        <input id="movieduration" type="number" placeholder="Choose a duration"></input>
        <button><Link to="/moviestable">Show table</Link></button>
        <input type="submit" value="Create"></input>
    </form>
    );
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;