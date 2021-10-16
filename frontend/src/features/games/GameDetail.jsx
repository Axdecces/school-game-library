import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';

import { selectGameById } from './gamesSlice'
import { selectAllTags } from "../tags/tagsSlice";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form';



function GameDetail(props) {
	const gameId = parseInt(props.match.params.gameId)
	const game = useSelector(state => selectGameById(state, gameId));
	const tags = useSelector(selectAllTags);

	const [gameTags, setGameTags] = useState([]);
	const [gameTagsChanged, setGameTagsChanged] = useState(false);
	const [edits, setEdits] = useState({id: gameId})

	useEffect(() => {
		let gameTags = [];
		if (game) {
			gameTags = game.tags
		}
        setGameTags(gameTags);
    }, [game])

	useEffect(() => {
		if (gameTagsChanged) {
			setEdits({...edits, 'tags': gameTags})
		}
	}, [gameTags])

	const dispatch = useDispatch();

	function TagsList() {
		return tags.map(tag => {
			return <Form.Check
				label={tag.title}
				name={tag.id}
				type='checkbox'
				id={tag.id}
				key={tag.id}
				checked={gameTags.includes(tag.id)}
				onChange={handleSelect}
			/>
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

	const handleSave  = () => {
		console.log(edits);
		dispatch({ type: 'games/update', payload: edits });
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

						{game && tags && <Row className='mb-3'>{<TagsList />}</Row>}
  						
  						
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