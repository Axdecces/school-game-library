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
    const game1 = {
      id: 1,
      title: "CS: GO",
      description: "Test",
      is_favorite: true,
      is_deleted: false,
      release_date: "2021-10-08",
      tags: []
    };
  
    const game2 = {
      id: 2,
      title: "HL 2",
      description: "Test",
      is_favorite: true,
      is_deleted: false,
      release_date: "2021-10-08",
      tags: []
    };
  
    const games = [game1, game2]

    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      dispatch({type: 'games/add', payload: game });
    }
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
