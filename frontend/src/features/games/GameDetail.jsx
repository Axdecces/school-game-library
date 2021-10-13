import React from "react";

import { useSelector, useDispatch } from 'react-redux';

import { selectGameById } from './gamesSlice'
import { selectAllTags } from "../tags/tagsSlice";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form';
import TagsEditView from "../tags/TagsEditView";



function GameDetail(props) {
	const game = useSelector(state => selectGameById(state, parseInt(props.match.params.gameId)));
	const tags = useSelector(selectAllTags);

	const dispatch = useDispatch();

	var edits = {};

	const handleChange = (e) => {
		edits[e.target.id] = e.target.value;
	}

	const handleSave  = () => {
		edits['id'] = game.id
		dispatch({ type: 'games/update', payload: edits })
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

						{game && tags && <TagsEditView tags={tags} />}
  						
  						
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