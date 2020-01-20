import React from 'react';
import notebookContext from '../../NotebookContext';
import TokenService from '../../TokenService';
import Head from '../Head/Head';

export default class NewGame extends React.Component {
    static contextType = notebookContext
    state = {
        name: ''
    }

//check to see if the user is logged into a valid account
    checkLogin() {
        return fetch(`${this.context.API_URL}/user/login`, {
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`
            }
        }).then(res => {
            if (res.status === 401) {
                this.props.history.push('/login');
            }
        });
    }

    ChangeName(e) {

        this.setState({
            name: e.currentTarget.value
        });
    }

    //submits the game to the api with the name, user id if found from the username/password
    SubmitGame(e) {
        e.preventDefault();

        this.apiAddGame(this.state.name);
    }

    apiAddGame(name) {
        const newGame = {
            gamename: name
        };

        return fetch(`${this.context.API_URL}/game/`, {
            method: 'POST',
            body: JSON.stringify(newGame),
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
        }).then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        }).then(game => {
            this.context.handleNewGame(game);
            this.props.history.push(`/game/${game.id}/1`);
        });
    }


    render() {
        //check to see if the user is logged into a valid account
        this.checkLogin();
        return (
            <div className='new_game_page'>
                <Head></Head>
                <form onSubmit={e => this.SubmitGame(e)} >
                    <label htmlFor='game_name'>New Adventure</label>
                    <input type='text' id='game_name' value={this.state.name} onChange={e => this.ChangeName(e)} />
                    <button type='submit'>Start Your Journey</button>
                </form>
                <button onClick={() => this.props.history.push('/')}>Cancel</button>
            </div>
        );

    }
}