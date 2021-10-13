import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { selectAllTags } from "././tagsSlice";


function TagsList() {
    const tags = useSelector(selectAllTags);
	
	const dispatch = useDispatch();

	var edits = []

	var newTagTitle = '';

	const handleChange = (e) => {
		const id = parseInt(e.target.id);
		const title = e.target.value;

		let prevEdit = edits.find(edit => edit.id === id);
		if (prevEdit) {
			prevEdit.title = title
		} else {
			edits.push({id: id, title: title})
		}
	}

	const handleSaveChanges = () => {
		for (const tag of edits) {
			dispatch({type: 'tags/update', payload: tag})
		}
		edits = []
	}

	const handleNewTagChange = (e) => {
		newTagTitle = e.target.value;
	}

	const handleCreateNew = () => {
		console.log(newTagTitle);
	}

	const tagsList = tags.map((tag) => <Col key={tag.id}><Form.Control id={tag.id} type='text' defaultValue={tag.title} placeholder='Name of the Category' onChange={handleChange}/></Col>)

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
        </Container>
	)
}

export default TagsList;