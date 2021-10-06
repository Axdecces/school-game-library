import React from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';

import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from './Header';
import GamesList from '../features/games/GamesList'

const baseURL = "http://localhost:8000";

function Tags() {
  return <h2>Tags</h2>;
}


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get(`${baseURL}/games`).then((response) => {
      for (const game in response.data) {
        dispatch({type: 'games/add', action: game});
      }
    });
  }, [dispatch]);


  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/games/" />
          </Route>
          <Route exact path="/games/" component={GamesList} />
          <Route exact path="/tags/">
            <Tags />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
