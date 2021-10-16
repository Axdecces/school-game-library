import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from  'react-router-dom';

import './Game.scss';

import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Fade from 'react-bootstrap/Fade';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { selectGameById } from './gamesSlice'
import { selectAllTags } from '../tags/tagsSlice';

import Favorite from './Favorite';
import Rating from './Rating';

import TagsModalPreview from '../tags/TagsModalPreview';

function Game(props) {
    const game = useSelector(state => selectGameById(state, props.id))
    const tags = useSelector(selectAllTags);

    const [gameTags, setGameTags] = useState([]);

    useEffect(() => {
        var gameTags = [];
        for (const tag of tags) {
            gameTags.push({id: tag.id, title: tag.title, selected: game.tags.includes(tag.id) ? true : false})
        }
        setGameTags(gameTags);
    }, [game, tags])
    

    const preview = game.preview;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hover, setHover] = useState(false);

    const handleEnter = () => setHover(true);
    const handleLeave = () => setHover(false);

    const dispatch = useDispatch();

    const handleFavoriteClick = () => {
        dispatch({type: 'games/update', payload: {id: game.id, isFavorite: !game.is_favorite} });
    }

    const handleRatingChange = (rating) => {
        dispatch({type: 'games/update', payload: {id: game.id, rating: rating} });
    }


    return (
        <Col className='game-width'>
            <Ratio aspectRatio="4x3" className='ratio'>
                <div
                    className='game-tile'
                    style={{backgroundImage: 'url(/CSGO.png)'}}
                    onClick={handleShow}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                >
                    
                    <Fade in={hover}>
                        <h1>{game.title}</h1>
                    </Fade>
                    <Fade in={hover}>
                        <div className='dark-overlay'></div>
                    </Fade>
                </div>
            </Ratio>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{ game.title }</Modal.Title>
                    <Favorite isFavorite={game.is_favorite} handleClick={handleFavoriteClick}/>
                    <Button variant='outline-dark' as={Link} to={'/games/' + game.id}><FontAwesomeIcon icon={faCog} /></Button>
                    <CloseButton variant='white' onClick={handleClose}/>
                </Modal.Header>
                <Modal.Body>
                    { game.description }
                </Modal.Body>
                <Modal.Footer>
                    <Rating rating={game.rating} handleChange={handleRatingChange} />
                    <TagsModalPreview tags={gameTags} />
                </Modal.Footer>
            </Modal>
        </Col> 
    );
}

export default Game;