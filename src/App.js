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
import ProfileEspace from './Screens/ProfileEspace/ProfileEspace';
import ProductDet from './Screens/ProductDet/ProductDet';
import CheckoutScreen from './Screens/CheckoutScreen/CheckoutScreen';
import ConfirmationScreen from './Screens/ConfirmationScreen/ConfirmationScreen';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);

  return (
    <Router>
          {
            user.role === "gerant" ? 
            (
              <Route path="/">
                <ProfileEspace />
              </Route>
            )
            : user.role === "client" ?
            (
              <Switch>
                <Route path="/confirmation">
                  <ConfirmationScreen />
                </Route>
                <Route path="/checkout/:id">
                  <CheckoutScreen />
                </Route>
                <Route path="/clientProfile">
                  <ProfileClient />
                </Route>
                <Route path='/product/:id'>
                  <ProductDet />
                </Route>
                <Route path="/">
                  <ShowClient />
                </Route>
              </Switch>
            )
            :
            (
              <Switch>
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
            )
          }
    </Router>
  );
}

export default App;
