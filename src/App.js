import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/signup/Register';
import Home from './pages/home/Home';
import Beams from './pages/Beams/Beams';
import LibraryEdit from './pages/libraryEdit/LibraryEdit';
import Libraries from './pages/libraries/Libraries';


function App() {

  const active = localStorage.getItem("auth");
  console.log(active)

  return (
    <div>
      
      <Router>
        
        <Switch>
          <Route exact path="/" ><Home /></Route>
          {/* <Route exact path="/" > {active ? <Home /> : <Login /> } </Route> */}
          <Route exact path="/login" ><Login /></Route>
          {/* <Route exact path="/login" >{active ? <Home /> : <Login />}</Route> */}
          <Route exact path="/signup" ><Register /></Route>
          {/* <Route exact path="/signup" >{active ? <Home /> : <Register />}</Route> */}
          <Route exact path="/beams" ><Beams  /></Route>
          {/* <Route exact path="/beams" >{active ? <Beams /> : <Login />}</Route> */}
          <Route exact path="/libraries" ><Libraries  /></Route>
          <Route exact path="/libraryEdit" ><LibraryEdit  /></Route>
        </Switch>
        
      </Router>

      
    </div>
  );
}

export default App;
