import React from 'react';
//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import List from './NoteList';
import { BrowserRouter } from 'react-router-dom';
import NotebookContext from '../../NotebookContext';
import Note from './NoteSmall'

it('renders List without crashing', () => {
    const location = { pathname: '1/1' }
    const value={games: [], tabs: [], notes:[]}
    const div = document.createElement('div');
    ReactDOM.render(<div>
        <NotebookContext.Provider value={value} >
            <BrowserRouter><List location={location} /></BrowserRouter>
        </NotebookContext.Provider>
    </div>, div);
    ReactDOM.unmountComponentAtNode(div);
})

it('renders a Note without crashing', () => {
    const route = '/game/1/1'
    const value={games: [], tabs: [], notes:[]}
    const div = document.createElement('div');
    ReactDOM.render(<div>
        <NotebookContext.Provider value={value} >
            <BrowserRouter><Note route={route} /></BrowserRouter>
        </NotebookContext.Provider>
    </div>, div);
    ReactDOM.unmountComponentAtNode(div);
})