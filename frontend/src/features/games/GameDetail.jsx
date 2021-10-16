import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';

import { selectGameById } from './gamesSlice'
import { selectAllTags } from "../tags/tagsSlice";

import Favorite from './Favorite';
import Rating from './Rating';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

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

	useEffect(() => {
		if (game) {
			setGameTags(game.tags);
			setIsFavorite(game.is_favorite);
		}
    }, [game]);

	useEffect(() => {
		if (gameTagsChanged) {
			setEdits({...edits, ['tags']: gameTags});
		}
	}, [gameTags]);

	useEffect(() => {
		if (favoriteChanged) {
			setEdits({...edits, ['favorite']: isFavorite});
		}
	}, [isFavorite]);

	const dispatch = useDispatch();

	function TagsList() {
		return tags.map(tag => {
			return (
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
		})
		
	} 

	const handleChange = (e) => {
		setEdits({...edits, [e.target.id]: e.target.value});
	}

	const handleSelect = (e) => {
		setGameTagsChanged(true);
		if (e.target.checked){
			setGameTags([...gameTags, parseInt(e.target.id)])
		} else {
			setGameTags(gameTags.filter((tag) => tag != e.target.id))
		};
	}

	const handleFavoriteClick = () => {
		setFavoriteChanged(true);
		setIsFavorite(!isFavorite);
    }

	const handleRatingChange = (rating) => {
		setEdits({...edits, ['rating']: rating });
	}

	const handleSave  = () => {
		console.log(edits);
		dispatch({ type: 'games/update', payload: edits });
		setEdits({ id: gameId });
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
						<Form.Group as={Row} className='mb-3' controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control type='text' defaultValue={game && game.title} placeholder='Title of the game' onChange={handleChange}/>
						</Form.Group>
					
						<Form.Group as={Row} className='mb-3' controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control as='textarea' rows={3} defaultValue={game && game.description} onChange={handleChange}/>
						</Form.Group>
						<Row className='mb-3'>
							{game && tags && <TagsList />}
							
							<Col>
							</Col>
						</Row>
						<Row className='mb-3'>
							<Col xs='auto'>
								<Favorite isFavorite={isFavorite} handleClick={handleFavoriteClick} />
							</Col>
							<Col xs='auto'>
								<Rating rating={game && game.rating} handleChange={handleRatingChange} />
							</Col>
						</Row>
						<Row className='mb-3'>
							<Col xs='auto'>
								<Button onClick={handleSave} className='mb-2'>
									Save Changes
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
				<Col />
			</Row>

		</Container>
	);
}

export default GameDetail;