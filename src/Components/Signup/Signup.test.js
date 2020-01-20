import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Signup from './Signup'


it('signup renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<div><Signup /></div>, div);
    ReactDOM.unmountComponentAtNode(div);
})