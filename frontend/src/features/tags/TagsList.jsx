import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal'

import { createTag, deleteTag, selectAllTags, updateTag } from "././tagsSlice";


function TagsList() {
    const tags = useSelector(selectAllTags);

	const [edits, setEdits] = useState([]);
	const [visibleTags, setVisibleTags] = useState(tags);
	const [newTagTitle, setNewTagTitle] = useState('');
	
	const [show, setShow] = useState(false);
	const [selectedTag, setSelectedTag] = useState(0);

  	const handleClose = () => {
		setShow(false);
		setSelectedTag(0);
	};

	const handleShow = id => {
		setShow(true);
		setSelectedTag(id);
	}
	
	const dispatch = useDispatch();

	useEffect(() => {
		setVisibleTags(tags)
	}, [tags])

	const handleChange = e => {
		const id = parseInt(e.target.id);
		const title = e.target.value;

		setEdits([...edits.filter(message => message.id !== id), {id: id, title: title}]);
	}

	const handleDelete = () => {
		dispatch(deleteTag(selectedTag));
		setVisibleTags(visibleTags.filter(tag => tag.id !== selectedTag));
		handleClose()
	}

	const handleSaveChanges = () => {
		for (const message of edits) {
			dispatch(updateTag(message))
		};
		setEdits([]);
	}

	const handleNewTagChange = e => {
		setNewTagTitle(e.target.value);
	}

	const handleCreateNew = () => {
		dispatch(createTag({title: newTagTitle}));
		setNewTagTitle('');
	}

	const tagsList = visibleTags.map((tag) => 
		<Col key={tag.id}>
			<div style={{position: 'relative'}}>
				<Form.Control id={tag.id} type='text' defaultValue={tag.title} placeholder='Name of the Category' onChange={handleChange}/>
				<CloseButton style={{position: 'absolute', right: '5px', top: '6px'}} id={tag.id} variant="white" onClick={() => handleShow(tag.id)}/>
			</div>
		</Col>)

	return (
		<Container fluid>
			<Row className='mb-3'>
				<Col />
				<Col xs={10}><h1>Categories</h1></Col>
				<Col />
				
			</Row>
          	<Row>
				<Col />
				<Col xs={10}>
					<Form>
						<Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className='g-3 mb-3'>
							{tags && tagsList}
						</Row>
						<Row className='g-3  mb-3'>
							<Col xs='auto'>
								<Button onClick={handleSaveChanges} className='mb-2'>
									Save Changes
								</Button>
							</Col>
						</Row>
						<Row>
							<Col xs='auto'>
      							<Form.Control
        							type="text"
        							id="newTag"
        							className="mb-2"
        							label="New Category"
									onChange={handleNewTagChange}
									value={newTagTitle}
      							/>
    						</Col>
							<Col xs='auto'>
								<Button onClick={handleCreateNew} className='mb-2'>
									Create New Category
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
				<Col />
          	</Row>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Category?</Modal.Title>
				</Modal.Header>
				<Modal.Body>This will also delete the category from all games it is assigned to.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						No
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
        </Container>
		
	)
}

export default TagsList;