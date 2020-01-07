import React from 'react';
import NotebookContext from '../../NotebookContext';
import { NavLink } from 'react-router-dom';
import './GameSelect.css';

export default class GameSelect extends React.Component {
    static contextType = NotebookContext;
    /*state={
        game: null
    }*/

    handleItemDelete(game){
        return fetch(`${this.context.API_URL}/game/${game.id}`,{
            method: 'DELETE'
        }).then(res =>{
            if(!res.ok){
               // return res.json().then(e => Promise.reject(e));
            }
            //return res.json();
        })
        .then(res =>{
            this.context.handleDeleteGame(game.id);
        })
    }

    handleItemClick(game){
        this.getGameNotes(game);
    }

    getGameNotes(game){
        return fetch(`http://localhost:8000/game/notes/${game.id}`)
            .then(noteRes =>{
                if(!noteRes.ok){
                    return noteRes.json().then(e => Promise.reject(e))
                }
                return noteRes.json();
            })
            .then(notes =>{
                this.context.handleChangeGame(notes);
            })
    }

    render() {
        console.log('games is ', this.context.games);
        const { games } = this.context;
        console.log(games);
        const items = games.map(game => 
            <li className='game' key={`${game.id}`} >
                <NavLink className="game_link" to={`/game/${game.id}/1`} >
                    <h3 className='game_title' value={game.id} 
                    onClick={e => this.handleItemClick(game) }>{`${game.gamename}`}</h3>
                    
                </NavLink>
                    <button className='delete_button'
                    onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?') &&
                        window.confirm('Seriously? Youre gonna dump it all?') &&
                        window.confirm('Last Chance...')){
                            this.handleItemDelete(game);
                        }
                    }}>Delete {game.gamename}</button>
            </li>
        )
        return (
            <div className="game_select">
                <h1>Choose your Adventure</h1>
                <ul>
                    {items}
                    <li  className='game'>
                        <NavLink className="new_game" to={`/new-game`}>
                            <h3 >
                                New Game
                            </h3>
                            
                        </NavLink>
                    </li>
                </ul>
            </div>

        )
    }
}