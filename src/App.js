import React from 'react';
import './App.css';
import HomeScreen from './Screens/Home/HomeScreen';
import LoginChoice from './Screens/LoginChoice/LoginChoice';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InscriptionClient from './Screens/InscreptionClient/InscriptionClient';
import InscriptionEspace from './Screens/InscriptionEspace/InscriptionEspace';
import ShowVisiteur from './Screens/ShowVisiteur/ShowVisiteur';
import ShowClient from './Screens/ShowClient/ShowClient';
import ProfileClient from './Screens/ProfileClient/ProfileClient';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/client">
            <ProfileClient />
          </Route>
          <Route path="/clientshow">
            <ShowClient />
          </Route>
          <Route path="/visiteur">
            <ShowVisiteur />
          </Route>
          <Route path="/InscriptionEspace">
            <InscriptionEspace />
          </Route>
          <Route path="/InscriptionClient">
            <InscriptionClient />
          </Route>
          <Route path="/loginchoice">
            <LoginChoice /> 
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
