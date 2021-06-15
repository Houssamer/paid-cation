import React from 'react';
import './App.css';
import HomeScreen from './Screens/Home/HomeScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
 
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
