import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Form from './NoteForm';
import {BrowserRouter} from 'react-router-dom';
import NotebookContext from '../../NotebookContext';

it('renders without crashing', () =>{
    const location = {pathname:'/note-form/1/1/1'};
    const value = {notes: []}
    const div = document.createElement('div');
    ReactDOM.render(<div>
        <NotebookContext.Provider value={value} >
        <BrowserRouter><Form location={location}/></BrowserRouter>
        </NotebookContext.Provider>
        </div>, div);
    ReactDOM.unmountComponentAtNode(div);
})