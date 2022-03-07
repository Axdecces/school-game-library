import React from "react";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Rating(props) {
    return(
        <ReactStars
            count={5}
            value={props.rating}
            isHalf={false}
            onChange={props.handleChange}
            size={24}
            activeColor="#ffffff"
            emptyIcon={<FontAwesomeIcon icon={['far', 'star']} />}
            fullIcon={<FontAwesomeIcon icon={['fas', 'star']} />}
        />
    )
}

export default Rating;