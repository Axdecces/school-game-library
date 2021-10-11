import React from "react";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';

function Rating(props) {
    const dispatch = useDispatch();

    let game = { id: props.gameId }

    const handleChange = (rating) => {
        game.rating = rating;
        dispatch({type: 'games/update', payload: game });
    }

    return(
        <ReactStars
            count={5}
            value={props.rating}
            isHalf={false}
            onChange={handleChange}
            size={24}
            activeColor="#ffffff"
            emptyIcon={<FontAwesomeIcon icon={['far', 'star']} />}
            fullIcon={<FontAwesomeIcon icon={['fas', 'star']} />}
        />
    )
}

export default Rating;