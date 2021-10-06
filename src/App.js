import './App.css';
import Home from './components/home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <div>
      
      <Router>
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/login" >
            <Login />
          </Route>
          <Route exact path="/signup" >
            <Register />
          </Route>
        </Switch>
        
          
      </Router>

      
    </div>
  );
}

export default App;
