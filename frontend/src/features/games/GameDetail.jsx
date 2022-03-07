import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from "react-router-dom";

import { selectGameById } from './gamesSlice'
import { selectAllTags } from "../tags/tagsSlice";

import { updateGame, deleteGame } from "./gamesSlice";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Figure from 'react-bootstrap/Figure';
import Spinner from 'react-bootstrap/Spinner';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { clientId, token } from "./apiAuth";



function GameDetail(props) {
	const gameId = parseInt(props.match.params.gameId)
	const game = useSelector(state => selectGameById(state, gameId));
	const tags = useSelector(selectAllTags);
	const history = useHistory();

	const [data, setData] = useState({ title: '', description: '', rating: 0, is_favorite: false, tags: [], image:''});
	const [imageUrl, setImageUrl] = useState('');
	const [showSpinner, setShowSpinner] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(true);


	const [showModal, setShowModal] = useState(false);

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const [titleInvalid, setTitleInvalid] = useState(false);
	const [descriptionInvalid, setDescriptionInvalid]  = useState(false);

	useEffect(() => {
		if (game) {
			setImageUrl(game.image);
			setData({...game})
		}
    }, [game]);

	const dispatch = useDispatch();

	function GameTagsList() {
		return tags.map(tag => 
			<Col key={tag.id} xs='auto'>
				<Form.Check
					label={tag.title}
					name={tag.id}
					type='checkbox'
					id={tag.id}
					checked={!!data.tags ? data.tags.includes(tag.id) : false}
					onChange={handleSelect}
				/>
			</Col>
		)
		
	} 

	const handleChange = (e) => {
		setData({...data, [e.target.id]: e.target.value});
	}

	const handleSelect = (e) => {
		if (e.target.checked){
			console.log(data)
			setData({...data, tags: [...data.tags, parseInt(e.target.id)]});
		} else {
			setData({...data, tags: [data.tags.filter((tag) => tag !== parseInt(e.target.id))]});
		};
	}

	const handleSave  = () => {
		console.log(data)
		if (data.title === '' || data.description === '') {
			if (data.title === '') {
				setTitleInvalid(true);
			}
			if (data.description === '') {
				setDescriptionInvalid(true);
			}
			console.log('Validation faulty')
			return
		} else {
			setTitleInvalid(false);
			setDescriptionInvalid(false);
		}
		if (!imageLoaded) {
			setToastMessage('Image was not loaded yet.');
			setShowToast(true);
			return
		} else if (data.image === game.image) {
			delete data.image;
		}

		dispatch(updateGame(data));
		setToastMessage('Saved.')
		setShowToast(true);
	}

	const handleDelete = () => {
		dispatch(deleteGame(gameId));
		history.push('/games/');
	}

	const handleFileUpload = (e) => {
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0]);
		setImageLoaded(false);
		reader.onload = () => {
			setData({...data, image: reader.result});
			setImageLoaded(true);
			setImageUrl('');
		}
	}

	const handleSearch = () => {
		setShowSpinner(true);
		axios({
			url: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Client-ID': clientId,
				'Authorization': 'Bearer ' + token,
			},
			data: `search "${data.title}"; fields name,total_rating,cover.image_id,summary;`
		  })
			.then(response => {
				const igdbData = response.data
				if (igdbData.length === 0) {
					setToastMessage('No game found.');
					setShowToast(true);

				} else {
					setData(state => {return {...state, title: igdbData[0].name, description: igdbData[0].summary}});
					console.log(data);
					const image = igdbData[0].cover.image_id;

					setShowSpinner(false);

					setImageUrl(`https://images.igdb.com/igdb/image/upload/t_720p/${image}.jpg`);
					axios({
						url : `https://cors-anywhere.herokuapp.com/https://images.igdb.com/igdb/image/upload/t_720p/${image}.jpg`,
						method: 'GET',
						responseType: 'blob'
					})
						.then(res => {
							const reader = new FileReader();
        					reader.readAsDataURL(res.data); 
							setImageLoaded(false);
        					reader.onload = () => {
								setData(state => {return {...state, image: reader.result}});
								setImageLoaded(true);
        					}
						})
						.catch(err => console.log(err))
				}
			})
			.catch(err => console.error(err));
	}

	const handleClose = () => {
		setShowModal(false);
	};
	
	const handleShow = () => {
		setShowModal(true);
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
						<Row>
							<Col sm={10}>
								<Row className='mb-3 g-1'>
									<Form.Group className='mb-3' controlId='title'>
										<Form.Label>Title</Form.Label>
										<InputGroup>
											<Form.Control required type='text' placeholder='Title of the game' defaultValue={data.title} onChange={handleChange} isInvalid={titleInvalid}/>
											<Button onClick={handleSearch} ><FontAwesomeIcon icon={faMagnifyingGlass} className='icon' /></Button>
										</InputGroup>
									</Form.Group>
									
								</Row>
								

								<Row className='mb-3 g-1'>
									<Form.Group className='mb-3' controlId='description'>
										<Form.Label>Description</Form.Label>
										<Form.Control required as='textarea' rows={3} placeholder='Short description for the game' value={data.description} onChange={handleChange} isInvalid={descriptionInvalid}/>
									</Form.Group>
								</Row>
							</Col>
							<Col sm={2} className='mt-3'>
								{ imageUrl && !showSpinner &&
									<Figure>
										<Figure.Image
											width={200}
											height={200}
											alt="preview"
											src={imageUrl}
										/>
										<Figure.Caption>
											Preview
										</Figure.Caption>
									</Figure>
								}
								{ showSpinner && 
									<Spinner className='mt-3' animation="border" variant="primary" />
								
								}
							</Col>
						</Row>

						<Row className='mb-3 g-2'>
							<Form.Label>Categories</Form.Label>
							{ tags && <GameTagsList />}
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
								<Button variant='secondary' onClick={handleShow}>
									Delete Game
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
				<Col />
			</Row>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Game?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						No
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
			<ToastContainer className='p-3 w-auto' position='bottom-center'>
				<Toast bg='primary' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
					<Toast.Body>{toastMessage}</Toast.Body>
				</Toast>
			</ToastContainer>
		</Container>
	);
}

export default GameDetail;