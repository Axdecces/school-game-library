import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import './Favorite.scss';
import { useDispatch } from 'react-redux';

function Favorite(props) {
    const dispatch = useDispatch()

    let game = { id: props.gameId }

    const handleClick = () => {
        game.isFavorite = !props.isFavorite;
        dispatch({type: 'games/update', payload: game });
    }

    return (
        <div className='favorite' onClick={handleClick}>
            {props.isFavorite ? <FontAwesomeIcon icon={fasHeart} /> : <FontAwesomeIcon icon={farHeart} />}
        </div>
    );
};

export default Favorite;