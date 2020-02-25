import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Game from './GameSelect';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () =>{
    const div = document.createElement('div');
    ReactDOM.render(<div><BrowserRouter><Game></Game></BrowserRouter></div>, div);
    ReactDOM.unmountComponentAtNode(div);
})