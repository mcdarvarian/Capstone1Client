import react from 'react';
import store from './store';

const NotebookContext = react.createContext({
    tabs: store.tabs,
    notes: store.notes,
    games: store.games,
    game_id: store.game_id,
    tab_id: store.tab_id,
    API_URL: store.API_URL,
    handleChangeGame: () => {},
    handleChangeTab: () =>{},
    handleUpdateNote: () => {},
    handleNewNote : () => {},
    handleDeleteNote : () => {},
    handleNewGame : () => {},
    handleDeleteGame : () => {}
});

export default NotebookContext;