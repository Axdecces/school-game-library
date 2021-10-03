import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from './Header';



function Games() {
  return <h2>Games</h2>;
}

function Tags() {
  return <h2>Tags</h2>;
}

function DeletedGames() {
  return <h2>Deleted Games</h2>;
}

function DeletedTags() {
  return <h2>Deleted Tags</h2>;
}


function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/games/" />
          </Route>
          <Route exact path="/games/" component={Games} />
          <Route exact path="/tags/" component={Tags} />
          <Route exact path="/deleted-games/" component={DeletedGames} />
          <Route exact path="/deleted-tags/" component={DeletedTags} />
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
