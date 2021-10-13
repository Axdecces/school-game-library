import React from 'react';
import { useDispatch } from 'react-redux'

import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from '../features/header/Header';
import GamesList from '../features/games/GamesList'
import GameDetail from '../features/games/GameDetail'
import TagsList from '../features/tags/TagsList'


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
      tags: [1, 2]
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

    const game3 = {
      id: 3,
      title: "HL 3",
      description: "Best game not in existence",
      is_favorite: true,
      is_deleted: false,
      release_date: "2021-10-08",
      tags: []
    };

    const game4 = {
      id: 4,
      title: "HL 4",
      description: "Best game not in existence",
      is_favorite: true,
      is_deleted: false,
      release_date: "2021-10-08",
      tags: []
    };

    const tag1 = {
      id: 1,
      title: "Multiplayer",
    };
    const tag2 = {
      id: 2,
      title: "Singleplayer",
    };
    const tag3 = {
      id: 3,
      title: "MMO",
    };
    const tag4 = {
      id: 4,
      title: "Open-World",
    };
  
    const games = [game1, game2, game3, game4]
    const tags = [tag1, tag2, tag3, tag4]

    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      dispatch({type: 'games/add', payload: game });
    }
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      dispatch({type: 'tags/add', payload: tag });
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
          <Route exact path="/categories/" component={TagsList} />
          <Route exact path="/games/:gameId/" component={GameDetail} />
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
