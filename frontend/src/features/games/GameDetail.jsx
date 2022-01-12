import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';

import { selectGameById } from './gamesSlice'
import { selectAllTags } from "../tags/tagsSlice";

import Favorite from './Favorite';
import Rating from './Rating';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import Form from 'react-bootstrap/Form';



function GameDetail(props) {
	const gameId = parseInt(props.match.params.gameId)
	const game = useSelector(state => selectGameById(state, gameId));
	const tags = useSelector(selectAllTags);

	const [edits, setEdits] = useState({ id: gameId });

	const [gameTags, setGameTags] = useState([]);
	const [gameTagsChanged, setGameTagsChanged] = useState(false);

	const [isFavorite, setIsFavorite] = useState(false);
	const [favoriteChanged, setFavoriteChanged] = useState(false);

	const [showToast, setShowToast] = useState(false);

	const [titleInvalid, setTitleInvalid] = useState(false);
	const [descriptionInvalid, setDescriptionInvalid]  = useState(false);

	useEffect(() => {
		if (game) {
			setGameTags(game.tags);
			setIsFavorite(game.is_favorite);
		}
    }, [game]);

	useEffect(() => {
		if (gameTagsChanged) {
			setEdits(edits => { return {...edits, tags: gameTags} });
		}
	}, [gameTags, gameTagsChanged]);

	useEffect(() => {
		if (favoriteChanged) {
			setEdits(edits => { return {...edits, isFavorite: isFavorite}});
		}
	}, [isFavorite, favoriteChanged]);

	const dispatch = useDispatch();

	function TagsList() {
		return tags.map(tag => 
			<Col key={tag.id} xs='auto'>
				<Form.Check
					label={tag.title}
					name={tag.id}
					type='checkbox'
					id={tag.id}
					checked={gameTags.includes(tag.id)}
					onChange={handleSelect}
				/>
			</Col>
		)
		
	} 

	const handleChange = (e) => {
		setEdits({...edits, [e.target.id]: e.target.value});
	}

	const handleSelect = (e) => {
		setGameTagsChanged(true);
		if (e.target.checked){
			setGameTags([...gameTags, parseInt(e.target.id)])
		} else {
			setGameTags(gameTags.filter((tag) => tag !== parseInt(e.target.id)))
		};
	}

	const handleFavoriteClick = () => {
		setFavoriteChanged(true);
		setIsFavorite(!isFavorite);
    }

	const handleRatingChange = (rating) => {
		setEdits({...edits, rating: rating });
	}

	const handleSave  = () => {
		if (edits.title === '' || edits.description === '') {
			if (edits.title === '') {
				setTitleInvalid(true);
			}
			if (edits.description === '') {
				setDescriptionInvalid(true);
			}
			console.log('Validation faulty')
			return
		} else {
			setTitleInvalid(false);
			setDescriptionInvalid(false);
		}


		console.log(edits)
		dispatch({ type: 'games/update', payload: edits });
		setEdits({ id: gameId });
		setShowToast(true);
	}

	const handleDelete = () => {
		console.log('Delte game')
	}

	const handleFileUpload = (e) => {
		console.log(e)
	}

	return (
		<Container fluid>
			<Row>
				<Col />
				<Col xs={10}>
					<h1>{game && game.title}</h1>
				</Col>
				<Col />
			</Row>
			<Row>
				<Col />
				<Col xs={10}>
					<Form>
						<Row className='mb-3 g-1'>
							<Form.Group className='mb-3' controlId='title'>
								<Form.Label>Title</Form.Label>
								<Form.Control required type='text' defaultValue={game && game.title} placeholder='Title of the game' onChange={handleChange} isInvalid={titleInvalid}/>
							</Form.Group>
						</Row>
						

						<Row className='mb-3 g-1'>
							<Form.Group className='mb-3' controlId='description'>
								<Form.Label>Description</Form.Label>
								<Form.Control required as='textarea' rows={3} defaultValue={game && game.description} onChange={handleChange} isInvalid={descriptionInvalid}/>
							</Form.Group>
						</Row>
						<Row className='mb-3 g-2'>
							<Form.Label>Categories</Form.Label>
							{game && tags && <TagsList />}
						</Row>
						<Row className='mb-3 align-items-center g-2'>
							<Col xs='auto'>
								<Form.Label className='m-0'>Favorite?</Form.Label>
							</Col>
							<Col xs='auto' className='me-3'>
								<Favorite isFavorite={isFavorite} handleClick={handleFavoriteClick} />
							</Col>
							<Col xs='auto'>
								<Form.Label className='m-0'>Rating</Form.Label>
							</Col>
							<Col xs='auto'>
								<Rating rating={game && game.rating} handleChange={handleRatingChange} />
							</Col>
						</Row>

						<Row className='mb-3 g-2'>
							<Form.Group controlId="preview">
							<Form.Label>Preview</Form.Label>
							<Form.Control type='file' bg='primary' onChange={handleFileUpload}/>
							</Form.Group>
						</Row>
						<Row className='mb-3 g-2'>
							<Col xs='auto'>
								<Button onClick={handleSave}>
									Save Changes
								</Button>
							</Col>
							<Col xs='auto'>
								<Button variant='danger' onClick={handleDelete}>
									Delete Game
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
				<Col />
			</Row>
			<ToastContainer className='p-3 w-auto' position='bottom-center'>
				<Toast bg='primary' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
					<Toast.Body>Änderungen gespeichert.</Toast.Body>
				</Toast>
			</ToastContainer>
		</Container>
	);
}

export default GameDetail;