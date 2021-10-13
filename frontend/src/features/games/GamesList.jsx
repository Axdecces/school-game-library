import React from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Game from './Game';

import { selectAllGames } from "./gamesSlice";

function GamesList() {
  const games = useSelector(selectAllGames);
  return (
    <Container fluid className='game-list'>
      <Row xs={1} sm={2} lg={3} xxl={4} className="g-5 justify-content-evenly">
        {games && games.map(game => {return <Game key={game.id} id={game.id} />})}
      </Row>
    </Container>
  )
}

export default GamesList;