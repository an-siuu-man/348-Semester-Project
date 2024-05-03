import React from 'react';

const pantryButton = (props) => {
    return (
        <input type = 'button'
        className='pantry-button'
        value = {props.caption}
        />
    );
}

export default pantryButton;