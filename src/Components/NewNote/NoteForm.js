import React from 'react';
import TabBar from '../TabBar/TabBar';
import notebookContext from '../../NotebookContext';
import './NoteForm.css';
import TokenService from '../../TokenService';
import Head from '../Head/Head';
import TextareaAutosize from 'react-textarea-autosize';

export default class NoteForm extends React.Component {
    static contextType = notebookContext;

    state = {
        game_id: this.context.game_id,
        tab_id: this.context.tab_id,
        id: 0,
        title: '',
        contents: '',

    }

    //check to see if the user is logged into a valid account
    checkLogin(){
        return fetch(`${this.context.API_URL}/user/login`, {
            headers: {
              'authorization': `basic ${TokenService.getAuthToken()}`
            }
          }).then(res =>{
              if(res.status === 401){
                  this.props.history.push('/login');
              }
          });
    }

    //checks to see if the note id is 0, if it is, leaves things empty, if it isnt, find the note and updates the state, returns null
    getNoteIfExists() {

        let id = this.props.location.pathname.replace('/note-form/', '').split('/')[2] || 0;
        if (id === 0) {
            return [false, 0, '', ''];
        } else {
            //stops program from throwing an error if the page is reloaded and context needs to be refilled
            if (this.context.notes.length !== 0) {
                const note = this.context.notes.filter(note => note.id === parseInt(id));
                if(note.length ===0){
                    return [false, 0, '', ''];
                }
                const title = note[0].title;
                const contents = note[0].contents;
                id = note[0].id;
                const exists = true;
                return [exists, id, title, contents];
            }
            return [false, 0, '', ''];
        }
    }

    changeTitle(e) {
        this.setState({
            title: e.currentTarget.value
        });
    }

    changeContents(e) {
        this.setState({
            contents: e.currentTarget.value
        });
    }

    //either makes a new note or updates a note depending on if the note itself exists
    SubmitNote(exists, id, e) {
        e.preventDefault();
        let {title, contents} = e.currentTarget;
        title = title.value;
        contents = contents.value;
        const gameid = this.props.location.pathname.replace('/note-form/', '').split('/')[0];
        const tabid = this.props.location.pathname.replace('/note-form/', '').split('/')[1];
        if(exists){
            this.props.history.push(`/note/${gameid}/${tabid}/${id}`);
            this.apiUpdateNote(gameid, tabid, id, title, contents);
            
            
        } else {
            this.props.history.push(`/game/${gameid}/${tabid}`);
            this.apiAddNote(gameid, tabid);

        }
    }

    apiUpdateNote(gameid, tabid, noteid, title, contents){
        const updateItem = {
            title: title,
            contents: contents
        };
        return fetch(`${this.context.API_URL}/note/${noteid}`, {
            method: 'PATCH',
            body: JSON.stringify(updateItem),
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
        }).then(res =>{
            if(res.ok){
                return res.json();
            } else {
                return res.json().then(e => Promise.reject(e));
            }
        }).then(resNote =>{
            this.context.handleUpdateNote(noteid, title, contents);
        });
    }

    apiAddNote(gameid, tabid){
        const newNote = {
            tab_id: tabid,
            game_id: gameid,
            title: this.state.title,
            contents: this.state.contents
        };
        return fetch(`${this.context.API_URL}/game/${gameid}/${tabid}`,{
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${TokenService.getAuthToken()}`
            },
        }).then(res =>{
            if(res.ok){
                return res.json();
            } else {
                return res.json().then(e => Promise.reject(e));
            }
        }).then(resJson =>{
            this.context.handleNewNote(resJson);
        });
    }

    componentDidMount(){
        this.checkLogin();
    }


    render() {
        const [exists, id, title, contents] = this.getNoteIfExists();
        const gameid = parseInt(this.props.location.pathname.replace('/note-form/', '').split('/')[0]) || 0;
        //const tabid = parseInt(this.props.location.pathname.replace('/note-form/', '').split('/')[0])
        return (
            <div className='note_form_page'>
                <Head></Head>
                <TabBar game={gameid}></TabBar>
                <form className='note_form' onSubmit={e => this.SubmitNote(exists, id, e)}>
                    <label htmlFor='title'>Note Title:</label>
                    <input type='text' id='title' defaultValue={title} onChange={e => this.changeTitle(e)} required />
                    <label id='note_label' htmlFor='contents'>Note:</label>
                    <TextareaAutosize  id='contents'  defaultValue={contents}
                        onChange={e => { this.changeContents(e) }}  required />
                    
                    <button className='submit'>Submit Note</button>
                </form>
                <button className='cancel' onClick={() => this.props.history.goBack()}>Cancel</button>
            </div>
        );
    
    }
}