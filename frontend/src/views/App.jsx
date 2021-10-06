import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

import './App.scss';

import Container from 'react-bootstrap/Container';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from './Header';
import Game from '../features/games/Game'

const baseURL = "http://localhost:8000";



function Games(props) {
  return (
    <Container fluid>
      {props.games.map((game => {return <Game id={game.id} />}))}
    </Container>
  )
}

function Tags() {
  return <h2>Tags</h2>;
}


function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    axios.get(`${baseURL}/games`).then((response) => {
      for (const game in response.data) {
        dispatch({type: 'games/add', action: game});
      }
    });
  }, []);

  const games = useSelector(state => state.games);


  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/games/" />
          </Route>
          <Route exact path="/games/">
            <Games games={games}/>
          </Route>
          <Route exact path="/tags/">
            <Tags />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
