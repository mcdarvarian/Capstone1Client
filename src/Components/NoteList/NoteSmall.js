import React from 'react';
import { NavLink } from 'react-router-dom'


export default class NoteSmall extends React.Component {

    render() {
        const route = this.props.route;
        const gameid = parseInt(route.replace('/game/', '').split('/')[0]);
        const tabid = parseInt(route.replace('/game/', '').split('/')[1]);
        return (
            
                <NavLink className='small_note' to={`/note/${gameid}/${tabid}/${this.props.id}`} >
                    <li><p >{`${this.props.name}`}</p></li>
                </NavLink>
                
        )
    }
}