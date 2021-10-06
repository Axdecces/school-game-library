import React from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';

import Game from './Game';

import { selectAllGames } from "./gamesSlice";

function GamesList() {
    const games = useSelector(selectAllGames);
    return (
        <Container fluid>
          {games.map(game => {return <Game id={game.id} />})}
        </Container>
      )
}

export default GamesList;