import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import Expa from './ExpandedNote';
import Note from './NoteBig';
import NotebookContext from '../../NotebookContext';
import { BrowserRouter } from 'react-router-dom';


it('note big renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<div><Note></Note></div>, div);
    ReactDOM.unmountComponentAtNode(div);
})

it('renderes expanded note without crashing', () =>{
    const location = {pathname: '/note/1/1'};
    const value = {games:[], tabs: [], notes:[]}
    const div = document.createElement('div');
    ReactDOM.render(<div>
        <NotebookContext.Provider value={value} >
        <BrowserRouter>
        <Expa location={location} />
        </BrowserRouter>
        </NotebookContext.Provider>
        </div>, div);
    ReactDOM.unmountComponentAtNode(div);
})