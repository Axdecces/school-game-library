import React from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Game from './Game';

import { selectAllGames } from "./gamesSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './GamesList.scss'

function GamesList() {
  const games = useSelector(selectAllGames);
  return (
    <Container fluid className='game-list'>
      <Row xs={1} sm={2} lg={3} xxl={4} className="g-5 justify-content-evenly">
        {games && games.map(game => {return <Game key={game.id} id={game.id} />})}
      </Row>
      <Button className='fab'>
        <FontAwesomeIcon icon={faPlus} size="3x" className='icon' />
      </Button>
    </Container>
    
  )
}

export default GamesList;