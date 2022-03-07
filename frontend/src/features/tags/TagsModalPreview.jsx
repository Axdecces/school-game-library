import React from "react";

function TagsModalPreview(props) {
	const tags = props.tags

	return (
		<div>
		{ 
			tags.map(tag => { 
				if (tag.selected) {
					return <div key={tag.id} style={{display: 'inline-block', border: '1px solid white', borderRadius: '5px', padding: '5px', margin: '5px'}}>{ tag.title}</div>
				} else {return null }
			})
		}
		</div>
	);
}

export default TagsModalPreview;