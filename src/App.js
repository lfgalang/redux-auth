import './App.css';
import Home from './components/home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Beams from './components/Beams/Beams';


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
          {/* <Route exact path="/beams" ><Beams  /></Route> */}
          <Route exact path="/beams" >{active ? <Beams /> : <Login />}</Route>
        </Switch>
        
      </Router>

      
    </div>
  );
}

export default App;
