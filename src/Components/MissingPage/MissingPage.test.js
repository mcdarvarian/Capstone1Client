import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import MissingPage from './MissingPage';

it ('Game selects loads without crashing', () =>{
    const div = document.createElement('div');
        ReactDOM.render(<div><MissingPage /></div>, div);
        ReactDOM.unmountComponentAtNode(div);
})