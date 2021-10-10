import React from "react";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';

function Rating(props) {
    const dispatch = useDispatch();

    const game = { id: props.id, rating: props.rating}

    return(
        <ReactStars
            count={5}
            value={game.rating}
            isHalf={false}
            onChange={dispatch({type: 'games/update', payload: game})}
            size={24}
            activeColor="#ffffff"
            emptyIcon={<FontAwesomeIcon icon={['far', 'star']} />}
            fullIcon={<FontAwesomeIcon icon={['fas', 'star']} />}
        />
    )
}

export default Rating;