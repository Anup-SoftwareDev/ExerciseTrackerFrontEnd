
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";

import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import ExercisesListTest from "./components/ExercisesListTest";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        {/*<ExercisesListTest/>*/}
        {/*<Test test='test'/>*/}
        <br/>
        <Routes>
          <Route path ="/" element = {<ExercisesListTest/>}/>
          <Route path ="/edit/:id" element = {<EditExercise/>}/>
          <Route path ="/create" element = {<CreateExercise/>}/>
          <Route path ="/user" element = {<CreateUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
