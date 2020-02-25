import React from 'react';
import BigNote from './NoteBig';
import TabBar from '../TabBar/TabBar';
import NotebookContext from '../../NotebookContext';
import './ExpandedNote.css';
import TokenService from '../../TokenService';
import Head from '../Head/Head';

export default class ExpandedNote extends React.Component {
    static contextType = NotebookContext;

    //check to see if the user is logged into a valid account
    checkLogin() {
        return fetch(`${this.context.API_URL}/user/login`, {
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`
            }
        }).then(res => {
            if (res.status === 401) {
                this.props.history.push('/login');
                return false;
            }
            return true;
        });
    }

    //send them to the note form with the note id
    handleUpdateItem(id, gameid, tabid) {
        this.props.history.push(`/note-form/${gameid}/${tabid}/${id}`);
    }

    //check if theyre sure and if they are, delete the note from the api and the client 
    handleItemDelete(id, gameid, tabid) {
        return fetch(`${this.context.API_URL}/note/${id}`,
            {
                method: 'DELETE',
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            }).then(() => {
                this.props.history.push(`/game/${gameid}/${tabid}`);
                this.context.handleDeleteNote(id);
            });
    }

    logOut(e) {
        e.preventDefault();
        TokenService.clearAuthToken();
        this.props.history.push('/login');
    }

    componentDidMount(){
        this.checkLogin();
    }


    render() {
        //get various pieces of information 
        let note = [];
        const id = this.props.location.pathname.replace('/note/', '').split('/');
        const gameid = parseInt(this.props.location.pathname.replace('/note/', '').split('/')[0]);
        const tabid = parseInt(this.props.location.pathname.replace('/note/', '').split('/')[1]);
        const gameName = this.context.games.filter(game => game.id === gameid)[0] || { gamename: 'no name' };
        const tabName = this.context.tabs.filter(tab => tab.id === tabid)[0] || { tabname: 'no name' };
        //filter all notes to only get the one you care about, if it doesnt exist, put through an empty note
        if (this.context.notes.length !== 0) {
            note = this.context.notes.filter(note => note.id === parseInt(id[2]));
        }
        if (note.length === 0) {
            note = [{ id: 0, title: '', contents: '' }];
        }

        return (
            <div className='expanded_note'>
                <Head></Head>
                <header>
                    <h1 className='gamename'>{gameName.gamename}/{tabName.tabname}</h1>

                </header>
                <main className='expanded_notes'>
                    <TabBar game={gameid}></TabBar>
                    <BigNote name={note[0].title} contents={note[0].contents}></BigNote>
                    <div className='update_note_button'>
                        <button onClick={() => {
                            this.handleUpdateItem(note[0].id, gameid, tabid)
                        }}>Update this note</button>
                    </div>
                    <div className='delete_note_button'>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) {
                                    this.handleItemDelete(note[0].id, gameid, tabid);
                                }
                            }}>Delete this note</button>
                    </div>
                    <button className='back' onClick={() => this.props.history.push(`/game/${gameid}/${tabid}`)}>Back</button>
                </main>
            </div>

        );

    }
}