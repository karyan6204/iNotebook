//Firstly Let's install some npm packages:
// 1. React router: It provides a way to introduce different pages or routes in our React application without reloading the page. To install react-router, use the below command:
// npm i react-router-dom


// 2. Concurrently: Concurrently is an npm package that allows us to use more than one server concurrently. To install concurrently, use the below command:
// npm i react-router-dom concurrently

// We want to start our backend and the react app simultaneously with the help of concurrently. Therefore, we will add the below piece of code in the script of package.json - React App
// "both": "concurrently \"npm run start\"  \"nodemon  backend/index.js\""
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/NoteState";
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useState } from "react";


function App() {
  const [alert, setAlert]=useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    {/* Wrapping our whole Router inside NoteState tag so that each of the components can access the NoteState Context inside them */}
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert = {alert}/>
        <Routes>
          <Route exact path="/" element = {<Home showAlert={showAlert}/>}/>
          <Route exact path="/about" element = {<About />}/>
          <Route exact path="/login" element = {<Login showAlert={showAlert} />}/>
          <Route exact path="/signup" element = {<Signup showAlert={showAlert}/>}/>
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
