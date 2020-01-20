import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Expa from './ExpandedNote';
import Note from './NoteBig';


it('note big renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<div><Note></Note></div>, div);
    ReactDOM.unmountComponentAtNode(div);
})