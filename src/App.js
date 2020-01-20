import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GameSelect from './Components/GameSelect/GameSelect';
import NotebookContext from './NotebookContext';
import NoteList from './Components/NoteList/NoteList';
import NoteForm from './Components/NewNote/NoteForm';
import ExpandedNote from './Components/ExpandedNote/ExpandedNote';
import MissingPage from './Components/MissingPage/MissingPage';
import NewGame from './Components/NewGame/NewGame';
import LoginForm from './Components/Login/LoginForm';
import Signup from './Components/Signup/Signup';
import Shhh from './Components/SecretAdminPage/Resetuser';
import config from './config';
import TokenService from './TokenService';


import './App.css';



const API_URL = config.API_URL;

class App extends Component {

  state = {
    games: [],
    notes: [{ id: 0 }],
    tabs: [],
    game_id: 0,
    tab_id: 1
  };



//get all the games, notes and tabs and puts them in context
  componentDidMount() {
    
    Promise.all([
      fetch(`${API_URL}/game/user`, {
        headers: {
          'authorization': `basic ${TokenService.getAuthToken()}`
        }
      }),
      fetch(`${API_URL}/setup`),
      fetch(`${API_URL}/note/user`, {
        headers: {
          'authorization': `basic ${TokenService.getAuthToken()}`
        }
      })
    ])
      .then(([gamesRes, setupRes, noteRes]) => {

        if (!gamesRes.ok)
          return gamesRes.json().then(e => Promise.reject(e));
        if (!setupRes.ok)
          return setupRes.json().then(e => Promise.reject(e));
        if (!noteRes.ok)
          return noteRes.json().then(e => Promise.reject(e));


        return Promise.all([gamesRes.json(), setupRes.json(), noteRes.json()]);
      })
      .then(([games, tabs, notes]) => {
        this.setState(
          {
            games: games,
            tabs: tabs,
            notes: notes
          }
        );
      })
      .catch(error => {
        console.error({ error });
      })

  }

  //changes notes in state 
  handleChangeGame = (notes) => {
    this.setState({ notes: notes });
  };

  //changes what tab youre in
  handleChangeTab = id => {
    this.setState({ tab_id: id });
  };

  //adds a note to the state
  handleAddNote = note => {
    
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  //adds a game to the state
  handleAddGame = game => {
    this.setState({
      games: [...this.state.games, game]
    });

  };

  //updates a note in the state
  handleUpdateNote = (id, newTitle, newContents) => {
    const notes = this.state.notes.map(note => {
      if (note.id === id) {
        const newNote = {
          id: id,
          tab_id: note.tab_id,
          game_id: note.game_id,
          title: newTitle,
          contents: newContents,
        };
        return newNote;
      }
      return note;
    });

    this.setState({
      notes: notes
    });
  };

  //deletes a note in the state
  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  //deletes a game in the state
  handleDeleteGame = game_id => {
    this.setState({
      games: this.state.games.filter(game => game.id !== game_id)
    });
  };

  renderHomeRoute() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={GameSelect} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/game/:game_id/:tab_id' component={NoteList} />
          <Route exact path='/note/:game_id/:tab_id/:note_id' component={ExpandedNote} />
          <Route exact path='/note-form/:game_id/:tab_id/:note_id' component={NoteForm} />
          <Route exact path='/new-game' component={NewGame} />
          <Route exact path='/shhh' component={Shhh} />

          <Route exact path='/not-found' component={MissingPage} />

          <Route component={MissingPage} />
        </Switch>
      </>
    );


  }


  render() {
    const value = {
      game_id: this.state.game_id,
      tab_id: this.state.tab_id,
      games: this.state.games,
      notes: this.state.notes,
      tabs: this.state.tabs,
      API_URL: API_URL,
      handleChangeGame: this.handleChangeGame,
      handleChangeTab: this.handleChangeTab,
      handleNewNote: this.handleAddNote,
      handleUpdateNote: this.handleUpdateNote,
      handleNewGame: this.handleAddGame,
      handleDeleteGame: this.handleDeleteGame,
      handleDeleteNote: this.handleDeleteNote
    };

    return (
      <NotebookContext.Provider value={value} >
        <div className='app_page'>
          <main>{this.renderHomeRoute()}</main>
        </div>
      </NotebookContext.Provider>

    );
  }
}

export default App;