import React from 'react';
import NotebookContext from '../../NotebookContext';
import { NavLink } from 'react-router-dom';
import './GameSelect.css';
import TokenService from '../../TokenService';
import Head from '../Head/Head';

export default class GameSelect extends React.Component {
    static contextType = NotebookContext;
    state = {
        user: {
            id: 0
        },
        checked: false
    }

    //check to see if the user is logged into a valid account
    checkLogin() {
        if (!this.state.checked) {
            return fetch(`${this.context.API_URL}/user/login`, {
                headers: {
                    'authorization': `basic ${TokenService.getAuthToken()}`
                }
            }).then(res => {
                if (res.status === 401 || !res.ok) {
                    this.props.history.push('/login');
                } else {
                    return res.json();
                }
            }).then(user => {
                this.setState({ user: user, checked: true });
                return user;
            });
        }
    }

    //delete the item from the api and from the context
    handleItemDelete(game) {
        return fetch(`${this.context.API_URL}/game/${game.id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`
            }
        }).then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
            
        })
            .then(res => {
                this.context.handleDeleteGame(game.id);
            });
    }

    //if the user wants to check out a game, take them there
    handleItemClick(game) {
        this.getGameNotes(game);
    }

    getGameNotes(game) {
        return fetch(`${this.context.API_URL}/game/notes/${game.id}`, {
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`
            }
        })
            .then(noteRes => {
                if (!noteRes.ok) {
                    return noteRes.json().then(e => Promise.reject(e));
                }
                return noteRes.json();
            })
            .then(notes => {
                this.context.handleChangeGame(notes);
            });
    }

    componentDidMount(){
        this.checkLogin();
    }


    render() {

            //get all games filtering ones relevant to the user
            const { games } = this.context;
            let items;
            if(!!games){
             items= games.map(game => {
                if (this.state.user.id === game.users_id) {
                    return (
                        <li className='game'  >
                            <NavLink className="game_link" to={`/game/${game.id}/1`} >
                                <h3 className='game_title' value={game.id}
                                    onClick={e => this.handleItemClick(game)}>{`${game.gamename}`}</h3>

                            </NavLink>
                            <button className='delete_button'
                                onClick={() => {
                                    if (window.confirm('Are you sure you wish to delete this item?') &&
                                        window.confirm('Seriously? Youre gonna dump it all?') &&
                                        window.confirm('Last Chance...')) {
                                        this.handleItemDelete(game);
                                    }
                                }}>Delete {game.gamename}</button>
                        </li>
                    );
                } else {
                    return (<></>)
                }
            }
            );
        }
            return (
                <div className="game_select">
                    <Head></Head>
                    <h1>Choose your Adventure!!!</h1>
                    <ul>
                        {items}
                        <li className='game'>
                            <NavLink className="new_game" to={`/new-game`}>
                                <h3>
                                    New Game
                            </h3>
                            </NavLink>
                        </li>
                    </ul>
                </div>

            );
        }
}