import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm'

it ('Login loads without crashing', () =>{
    const div = document.createElement('div');
        ReactDOM.render(<div><LoginForm /></div>, div);
        ReactDOM.unmountComponentAtNode(div);
})