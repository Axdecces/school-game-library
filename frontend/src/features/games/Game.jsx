import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from  'react-router-dom';

import './Game.scss';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Fade from 'react-bootstrap/Fade';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { selectGameById, updateGame } from './gamesSlice'
import { selectAllTags } from '../tags/tagsSlice';

import Favorite from './Favorite';
import Rating from './Rating';

import TagsModalPreview from '../tags/TagsModalPreview';

function Game(props) {
    const game = useSelector(state => selectGameById(state, props.id));
    
    const tags = useSelector(selectAllTags);

    const [gameTags, setGameTags] = useState([]);

    useEffect(() => {
        if (!!game) {
            var gameTags = [];
            for (const tag of tags) {
                gameTags.push({id: tag.id, title: tag.title, selected: game.tags.includes(tag.id) ? true : false})
            }
            setGameTags(gameTags);
        }
    }, [game, tags])
    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hover, setHover] = useState(false);

    const handleEnter = () => setHover(true);
    const handleLeave = () => setHover(false);

    const dispatch = useDispatch();

    const handleFavoriteClick = () => {
        dispatch(updateGame({ id: game.id, is_favorite: !game.is_favorite }));
    }

    const handleRatingChange = (rating) => {
        dispatch(updateGame({ id: game.id, rating: rating}))
    }

    return (
        game ?
        <Col>
            <Ratio aspectRatio='1x1' className='ratio'>
                <div
                    className='game-tile'
                    style={{backgroundImage: `url(${game.image})`}}
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
                <Stack className='w-100' direction="horizontal" gap={2}>
                    <Modal.Title className='me-auto break-word'>{ game.title }</Modal.Title>
                    <Favorite className='ms-auto'  isFavorite={game.is_favorite} handleClick={handleFavoriteClick}/>
                    <Button variant='primary' as={Link} to={'/games/' + game.id}><FontAwesomeIcon icon={faCog} /></Button>
                    <CloseButton className='ms-0' variant='white' onClick={handleClose}/>
                </Stack>
                </Modal.Header>
                <Modal.Body>
                    <p style={{whiteSpace: 'pre-line'}}>{ game.description }</p>
                </Modal.Body>
                <Modal.Footer>
                    <Rating rating={game.rating} handleChange={handleRatingChange} />
                    <TagsModalPreview tags={gameTags} />
                </Modal.Footer>
            </Modal>
        </Col>
        :
        null
    );
}

export default Game;