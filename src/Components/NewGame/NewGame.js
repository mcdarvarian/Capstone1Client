import React from 'react';
import notebookContext from '../../NotebookContext'

export default class NewGame extends React.Component{
    static contextType = notebookContext
    state ={
        name: ''
    }

    ChangeName(e){
        
        this.setState({
            name: e.currentTarget.value
        })
    }
    
    SubmitGame(e){
        e.preventDefault();
        
        this.apiAddGame(this.state.name);
    }

    apiAddGame(name){
        const newGame = {
            users_id: 2,
            gamename: name
        };

        return fetch(`${this.context.API_URL}/game/`,{
            method: 'POST',
            body: JSON.stringify(newGame),
            headers: {
                'content-type': 'application/json'
            },
        }).then(res =>{
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        }).then(game =>{
            console.log(game);
            this.context.handleNewGame(game);
            this.props.history.push(`/game/${game.id}/1`);
        })
    }

    render(){
        return(
            <div className='new_game_page'>
                <form onSubmit={e => this.SubmitGame(e)} >
                    <label htmlFor='game_name'>New Adventure</label>
                    <input type='text' id='game_name' value={this.state.name} onChange={e => this.ChangeName(e)} />
                    <button type='submit'>Start Your Journey</button>
                </form>
                    <button onClick={() => this.props.history.goBack()}>Cancel</button>
            </div>
        )
    }
}