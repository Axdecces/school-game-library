import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import './Favorite.scss';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button'

function Favorite(props) {
    const dispatch = useDispatch()

    let game = { id: props.gameId }

    const handleClick = () => {
        game.isFavorite = !props.isFavorite;
        dispatch({type: 'games/update', payload: game });
    }

    return (
        <Button className='favorite' variant='outline-dark' onClick={handleClick}>
            {props.isFavorite ? <FontAwesomeIcon icon={fasHeart} /> : <FontAwesomeIcon icon={farHeart} />}
        </Button>
    );
};

export default Favorite;