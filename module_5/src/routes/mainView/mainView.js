import React from "react";
import Form from "../../components/Form.jsx";
import Favs from "../../components/Favs.jsx";

const App = () => (
  <div>
    <h1>React movies</h1>
    <h2>Create a movie</h2>
    <Form/>
    <h2>My favorite movies</h2>
    <Favs/>
  </div>
);

export default App;