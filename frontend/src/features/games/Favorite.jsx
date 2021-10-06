import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Favorite(props) {
    return (
        <div>
            {props.isFavorite ? <FontAwesomeIcon icon={['fas', 'heart']} /> : <FontAwesomeIcon icon={['far', 'heart']} />}
        </div>
    );
};

export default Favorite;