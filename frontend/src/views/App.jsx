import React from 'react';
import { useDispatch } from 'react-redux';

import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from '../features/header/Header';
import GamesList from '../features/games/GamesList';
import GameDetail from '../features/games/GameDetail';
import GameCreate from '../features/games/GameCreate';
import TagsList from '../features/tags/TagsList';

import { fetchTagsList } from '../features/tags/tagsSlice';
import { fetchGamesList } from '../features/games/gamesSlice';


function App() {
  const dispatch = useDispatch();

  dispatch(fetchTagsList())
  dispatch(fetchGamesList())

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/games/" />
          </Route>
          <Route exact path="/games/" component={GamesList} />
          <Route exact path="/categories/" component={TagsList} />
          <Route exact path="/games/new/" component={GameCreate} />
          <Route exact path="/games/:gameId/" component={GameDetail} />
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
