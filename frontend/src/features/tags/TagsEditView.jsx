import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function TagsEditView(props) {
	const tags = props.tags;

	const tagsList = tags.map((tag)=> 
		<Form.Check
			inline
			label={tag.title}
			name={tag.id}
			type='checkbox'
			id={tag.id}
			key={tag.id}
		/>
	)
	return (<Row className='mb-3'>{tagsList}</Row>);
}

export default TagsEditView;