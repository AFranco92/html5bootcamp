import {toggleFav, delMovie, addFav, delFav, editMovie, toggleEdit} from "../actions/index";
import React, { Component } from "react";
import { connect } from "react-redux";
import '../index.css';

const mapStateToProps = state => {
  return { movies: state.movies,
  favmovies: state.favmovies };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleFav: id => dispatch(toggleFav(id)),
    addFav: movie => dispatch(addFav(movie)),
    delFav: index => dispatch(delFav(index)),
    delMovie: index => dispatch(delMovie(index)),
    toggleEdit: id => dispatch(toggleEdit(id)),
    editMovie : edmoviedata => dispatch(editMovie(edmoviedata))
  };
}

class ConnectedResultTable extends Component {
  constructor() {
    super();
    this.getIndex = this.getIndex.bind(this);
    this.handleToggleFav = this.handleToggleFav.bind(this);
    this.handleDelMovie = this.handleDelMovie.bind(this);
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
  }
  
  getIndex(id) {
    let index;
    for(let i = 0; i < this.props.movies.length; i++) {
      if(this.props.movies[i].id === id) {
        index = i;
      }
    }
    return index;
  }

  handleDelMovie(id) {
    let index = this.getIndex(id);
    this.props.delMovie(index);
  }

  handleToggleEdit(id) {
    this.props.toggleEdit(id);
  }

  handleEditMovie(edid) {
    let edname = document.getElementById("edmoviename").value;
    let edyear = document.getElementById("edmovieyear").value;
    let edduration = document.getElementById("edmovieduration").value;
    let edmoviedata = {
      name: edname,
      year: edyear,
      duration: edduration,
      id: edid
    }
    this.props.editMovie(edmoviedata);
  }

  handleToggleFav(id) {
    this.props.toggleFav(id);
    let movie;
    for(let i = 0; i < this.props.movies.length; i++) {
      if(this.props.movies[i].id === id && !this.props.movies[i].isfavorite) {
        movie = this.props.movies[i];
        this.props.addFav(movie);
      }
    }
    for(let i = 0; i < this.props.favmovies.length; i++) {
      if(this.props.favmovies[i].id === id && !this.props.favmovies[i].isfavorite) {
        let favmovie = this.props.favmovies[i];
        this.props.delFav(favmovie);
      }
    }
  }

  render() {
    for(let i = 0; i < this.props.movies.length; i++) {
      if(this.props.movies[i].editable === true) {
        return (
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Year</td>
                <td>Duration</td>
              </tr>
            </thead>
            <tbody>
              <tr key={this.props.movies[i].id}>
                <td><input className="editfield" id="edmoviename" type="text" defaultValue={this.props.movies[i].name}></input></td>
                <td><input className="editfield" id="edmovieyear" type="text" defaultValue={this.props.movies[i].year}></input></td>
                <td><input className="editfield" id="edmovieduration" type="text" defaultValue={this.props.movies[i].duration}></input></td>
                <td><input className="btncanceledit" type="button" value="Cancel" data-id={this.props.movies[i].id} onClick={() => this.handleToggleEdit(this.props.movies[i].id)} /></td>
                <td><input className="btnconfedit" type="button" value="Ok" data-id={this.props.movies[i].id} onClick={() => this.handleEditMovie(this.props.movies[i].id)}></input></td>
              </tr>
            </tbody>
          </table>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Year</td>
            <td>Duration</td>
            <td>Favorite</td>
          </tr>
        </thead>
        <tbody>
          {this.props.movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>{movie.year}</td>
              <td>{movie.duration}</td>
              <td><input id="cbox" type="checkbox" data-id={movie.id} onClick={() => this.handleToggleFav(movie.id)}></input></td>
              <td><input className="btnedit" type="button" value="Edit" data-id={movie.id} onClick={() => this.handleToggleEdit(movie.id)}/></td>
              <td><input className="btndel" type="button" value="x" data-id={movie.id} onClick={() => this.handleDelMovie(movie.id)}></input></td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

const ResultTable = connect(mapStateToProps, mapDispatchToProps)(ConnectedResultTable);
export default ResultTable;