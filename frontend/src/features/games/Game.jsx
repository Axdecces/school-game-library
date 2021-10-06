import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Fade from 'react-bootstrap/Fade';

import Favorite from './Favorite';
import Rating from './Rating';

import TagsPreview from '../tags/TagsPreview';

function Game(props) {
    const gameId = props.id;

    const game = useSelector(state =>
        state.games.find(game => game.id === gameId)
    );

    const preview = game.preview;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hover, setHover] = useState(false);

    const handleEnter = () => setHover(true);
    const handleLeave = () => setHover(false);


    return (
        <Col>
            <Ratio aspectRatio="4x3">
                <div
                    style={{ width: '100%', height: 'auto' , backgroundImage: {preview}}}
                    onClick={handleShow}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                >
                    <Fade in={hover}>
                        <h1>{game.title}</h1>
                    </Fade>
                </div>
            </Ratio>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{ game.title }</Modal.Title>
                    <Favorite isFavorite={game.is_favorite}/>
                </Modal.Header>
                <Modal.Body>
                    { game.description }
                </Modal.Body>
                <Modal.Footer>
                    <Rating rating={game.rating} />
                    <TagsPreview tags={game.tags} />
                </Modal.Footer>
            </Modal>
        </Col> 
    );
}

export default Game;