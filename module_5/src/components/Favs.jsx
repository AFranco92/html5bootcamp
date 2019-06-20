import React from "react";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return { favmovies: state.favmovies };
};

class ConnectedFavs extends React.Component {
  render() {
    if(this.props.favmovies) {
      return (
        <div>
          <ul>
            {this.props.favmovies.map(favmovie => (
              <li key={favmovie.id}>{favmovie.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

const Favs = connect(mapStateToProps)(ConnectedFavs);
export default Favs;