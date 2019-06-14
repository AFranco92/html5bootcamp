import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : [{
          id: Date.now(),
          name: "Titanic",
          year : 1997,
          duration : 195,
          isfavorite : false,
          editable : false
        }],
      favmovies : []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onToggleFav = this.onToggleFav.bind(this);
    this.onToggleEditable = this.onToggleEditable.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.delNoFav = this.delNoFav.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let moviename = document.getElementById('moviename');
    let movieyear = document.getElementById('movieyear');
    let movieduration = document.getElementById('movieduration');
    if (moviename.value === "" || movieyear.value === "" || movieduration.value === "") {
      return;
    }
    let newmovie = {
      id : Date.now(),
      name : moviename.value,
      year : movieyear.value,
      duration : movieduration.value,
      isfavorite : false,
      editable : false
    };
    this.setState(state => ({
      movies : state.movies.concat(newmovie)
    }));
  }
  getIndex(id) {
    let index;
    id = parseInt(id);
    for(let i = 0; i < this.state.movies.length; i++) {
      if(this.state.movies[i].id === id) {
        index = i;
      }
    }
    return index;
  }
  onToggleFav(e) {
    let id = e.target.dataset.id;
    let index = this.getIndex(id);
    this.setState(prevState => ({ 
        ...prevState.movies[index].isfavorite = !prevState.movies[index].isfavorite
    }
    ));
    this.delNoFav(index);
  }
  onToggleEditable(e) {
    let id = e.target.dataset.id;
    let index = this.getIndex(id);
    this.setState(prevState => ({ 
        ...prevState.movies[index].editable = !prevState.movies[index].editable
    }
    ));
  }

  //The method setState has a bug because it add characters in the state. But the movie is edited successfully.
  editMovie(e) {
    let name = document.getElementById('edmoviename').value;
    let year = document.getElementById('edmovieyear').value;
    let duration = document.getElementById('edmovieduration').value;
    let id = e.target.dataset.id;
    let index = this.getIndex(id);
    this.setState(prevState => ({
      ...prevState.movies[index].name = name,
      ...prevState.movies[index].year = year,
      ...prevState.movies[index].duration = duration
    }));

    //Setting false to the variable editable after editing the movie.
    this.onToggleEditable(e);
  }
  delNoFav(index) {
    if(this.state.favmovies.length > 0) {
      for(let i = 0; i < this.state.favmovies.length; i++) {
        if(this.exists(this.state.favmovies[i].id)) {
          this.delNoFavFromArr(index);
        }
      }
    }
  }
  delNoFavFromArr(index) {
    let auxfavmovies = [...this.state.favmovies];
    if(index !== -1) {
      auxfavmovies.splice(index, 1);
      this.setState({favmovies : auxfavmovies});
    }
  }

  //Method that checks there are not repeated elements.
  exists(id) {
    for(let i = 0; i < this.state.favmovies.length; i++) {
      if(this.state.favmovies[i].id === id) {
        return true;
      }
    }
    return false;
  }

  //This method probably has a bug because when I select a movie as a favorite, all the movies are
  //setted in the array favmovies[]. But only the chosen one has the value of the attribute isfavorite in true.  
  getFavs() {
    let res = [...this.state.favmovies];
    for(let i = 0; i < this.state.movies.length; i++) {
      if(!this.state.movies[i].isfavorite && !this.exists(this.state.movies[i].id)) {
        res.push(this.state.movies[i]);
      }
    }
    return res;
  }
  handleClick() {                                                                       
    let auxfavs = this.getFavs();
    this.setState({favmovies : auxfavs});
  }

  //Method that create a copy of movies[] and delete the element inside of that copy.
  //Then, the movies state is changed by the copy.
  //If the movie was favorite, it is also deleted from the array of favorites.
  handleDelete(e) {
    let auxmovies = [...this.state.movies];
    let id = e.target.dataset.id;
    let index = this.getIndex(id);
    if(index !== -1) {
      auxmovies.splice(index, 1);
      this.setState({movies : auxmovies});
    }
    this.delNoFav(e, id, index);
  }
  render() {
    return(
      <div>
        <Header/>
        <SubHeader/>
        <form onSubmit={this.handleSubmit}>
          <input id="moviename" value={this.state.movies.name} type="text" placeholder="Choose a name"></input>
          <input id="movieyear" value={this.state.movies.year} type="number" placeholder="Choose a year"></input>
          <input id="movieduration" value={this.state.movies.duration} type="number" placeholder="Choose a duration"></input>
          <input type="submit" value="Create"></input>
        </form>
        <ResultTable movies={this.state.movies} onToggleFav={this.onToggleFav} editMovie={this.editMovie}
        onToggleEditable={this.onToggleEditable} handleClick={this.handleClick} handleDelete={this.handleDelete}/>
        <h2>My favorite movies</h2>
        <Favs favmovies={this.state.favmovies}/>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <h1>{"React Movies"}</h1>
    );
  }
}

class SubHeader extends React.Component {
  render() {
    return(
      <div>
        <h2>Create a movie</h2>
      </div>
    );
  }
}

class ResultTable extends React.Component {
  render() {
    let movies = Array.from(this.props.movies);
    for(let i = 0; i < movies.length; i++) {
      if(movies[i].editable === true) {
        return(
          <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Year</td>
              <td>Duration</td>
            </tr>
          </thead>
          <tbody>
            <tr key={movies[i].id}>
              <td><input className="editfield" id="edmoviename" type="text" defaultValue={movies[i].name}></input></td>
              <td><input className="editfield" id="edmovieyear" type="text" defaultValue={movies[i].year}></input></td>
              <td><input className="editfield" id="edmovieduration" type="text" defaultValue={movies[i].duration}></input></td>
              <td><input className="btncanceledit" type="button" value="Cancel" data-id={movies[i].id} onClick={this.props.onToggleEditable}/></td>
              <td><input className="btnconfedit" type="button" value="Ok" data-id={movies[i].id} onClick={this.props.editMovie}></input></td>
          </tr>
          </tbody>
        </table>
        );
      }
    }
    return(
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
        {movies.map(movie => (
          <tr key={movie.id}>
            <td>{movie.name}</td>
            <td>{movie.year}</td>
            <td>{movie.duration}</td>
            <td><input type="checkbox" data-id={movie.id} onChange={this.props.onToggleFav} onClick={this.props.handleClick}></input></td>
            <td><input className="btnedit" type="button" value="Edit" data-id={movie.id} onClick={this.props.onToggleEditable}/></td>
            <td><input className="btndel" type="button" value="x" data-id={movie.id} onClick={this.props.handleDelete}></input></td>
        </tr>))}
        </tbody>
      </table>
    );
  }
}

class Favs extends React.Component {
  render() {
    let favmovies = Array.from(this.props.favmovies);
    if(this.props.favmovies.length === 0) {
      return null;
    }
    for(let i = 0; i < this.props.favmovies.length; i++) {
      if(!this.props.favmovies[i].isfavorite) {
        return null;
      }
    }
    return(
      <div>
        <ul>
        {favmovies.map(favmovie => (
            <li key={favmovie.id}>{favmovie.name}</li>
        ))}
        </ul>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
