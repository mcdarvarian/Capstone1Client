import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Resetuser from './Resetuser';

it ('Login loads without crashing', () =>{
    const div = document.createElement('div');
        ReactDOM.render(<div><Resetuser /></div>, div);
        ReactDOM.unmountComponentAtNode(div);
});