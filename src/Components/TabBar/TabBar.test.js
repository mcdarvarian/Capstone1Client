import React from 'react';
import {BrowserRouter} from 'react-router-dom';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Tab from './Tab';
import TabBar from './TabBar'


it('TabBar renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<div><BrowserRouter><TabBar /></BrowserRouter></div>, div);
    ReactDOM.unmountComponentAtNode(div);
})

it('Tab renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<div><BrowserRouter><Tab /></BrowserRouter></div>, div);
    ReactDOM.unmountComponentAtNode(div);
})