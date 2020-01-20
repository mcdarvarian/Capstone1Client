import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Head from './Head';
import {BrowserRouter} from 'react-router-dom';

it ('Head loads without crashing', () =>{
    const div = document.createElement('div');
        ReactDOM.render(<div><BrowserRouter><Head /></BrowserRouter></div>, div);
        ReactDOM.unmountComponentAtNode(div);
})