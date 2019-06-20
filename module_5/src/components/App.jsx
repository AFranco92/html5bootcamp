import React from "react";
import Form from "./Form.jsx";
import ResultTable from "./ResultTable.jsx";
import Favs from "./Favs.jsx";

const App = () => (
  <div>
    <h1>React movies</h1>
    <h2>Create a movie</h2>
    <Form/>
    <ResultTable/>
    <h2>My favorite movies</h2>
    <Favs/>
  </div>
);

export default App;