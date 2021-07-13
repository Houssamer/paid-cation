import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Login, Logout, selectUser } from './features/userSlice';
import axios from './axios/axios';
import { removeProducts, selectProducts, setProducts } from './features/productsSlice';


function App() {
  const user = useSelector(selectUser);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
  
      axios.get("/api/users/", config)
           .then((res) => {
             dispatch(Login({
               token: localStorage.getItem('token'),
               id: res.data._id,
               firstName: res.data.firstName,
               lastName: res.data.lastName,
               email: res.data.email,
               num: res.data.num,
               role: res.data.role,
               entreprise: res.data.entreprise,
               image: res.data.image,
             }))
           })
           .catch((err) => {
             dispatch(Logout());
           })
    }

    axios.get('/api/products/all')
    .then((res) => {
      dispatch(removeProducts());
      res.data.forEach(data => {
        dispatch(setProducts([
        ...products,
        {
         id: data._id,
         owner_id: data.owner_id,
         title: data.title,
         images: data.images,
         lieu: data.lieu,
         features: data.features,
         price: data.price,
         type: data.type,
         timing: data.timing,
         rate: data.rate,
         ville: data.ville,
         description: data.description,
        }]))})
    })
    .catch((err) => console.log(err));

  }, [dispatch])

  return (
    <div className="App">
      <Router>
            {
            user ?
              user.role === "gerant" ? 
              (
                <Switch>
                  <Route path="/">
                    <ProfileEspace />
                  </Route>
                </Switch>
              )
              : user.role === "client" &&
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
                  <Route path='/product/:id'>
                    <ProductDet />
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
    </div>
  );
}

export default App;
