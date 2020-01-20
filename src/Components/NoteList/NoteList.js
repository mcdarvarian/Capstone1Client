import NoteSmall from './NoteSmall';
import React from 'react';
import NotebookContext from '../../NotebookContext';
import TabBar from '../TabBar/TabBar';
import { NavLink } from 'react-router-dom';
import './NoteList.css';
import TokenService from '../../TokenService';
import Head from '../Head/Head';


export default class NoteList extends React.Component {

    //can get screen and make dynamic sizing in js figure that out if you have time 

    static contextType = NotebookContext;


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

    //makes sure youre in a place that exists otherwise kicks you out
    checkIfRightPage(gameid, tabid) {
        const game = this.context.games.filter(game => game.id === gameid);
        const tab = this.context.tabs.filter(tab => tab.id === tabid);
        if (game.length === 0 || tab.length === 0) {
            if (this.context.games.length !== 0) {
                this.props.history.push('/not-found');
            }
        }
    }



    render() {
        //check to see if the user is logged into a valid account
        this.checkLogin();
        //gets relevant information for the 
        let route = this.props.location.pathname;
        const gameid = parseInt(route.replace('/game/', '').split('/')[0]);
        const tabid = parseInt(route.replace('/game/', '').split('/')[1]);
        const gameName = this.context.games.filter(game => game.id === gameid)[0] || { gamename: 'no name' };
        const tabName = this.context.tabs.filter(tab => tab.id === tabid)[0] || { tabname: 'no name' };

        //kicks you out if youre lost
        this.checkIfRightPage(gameid, tabid);

        //make a list of condensed notes
        const notes = this.context.notes;
        let noteList = notes.filter(note => note.tab_id === tabid && note.game_id === gameid);
        noteList = noteList.map(note => {
            return <NoteSmall key={note.id} route={route} id={note.id} name={note.title} contents={note.contents}></NoteSmall>
        });

        return (
            <div className='tab_notes'>
                <Head></Head>
                <header>
                    <h1 className='gamename'>{gameName.gamename}</h1>
                    <h3 className='tabname'>{tabName.tabname}</h3>
                </header>
                <TabBar game={gameid}></TabBar>
                <div className='spacing'>
                    <ul className='note_list'>
                        {noteList}
                        <NavLink className='small_note' to={`/note-form/${gameid}/${tabid}/0`} ><li>
                            <h3>Make New Note</h3></li></NavLink>
                    </ul>
                </div>
                <div className='goback'>
                    <button className='gameSelect' onClick={() => { this.props.history.push('/') }}>Back to Game Select</button>
                </div>
            </div>
        );

    }
}