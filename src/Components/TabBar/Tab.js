import React from 'react';
import { NavLink } from 'react-router-dom';
import NotebookContext from '../../NotebookContext'
import './TabBar.css';

export default class Tab extends React.Component {
    static contextType = NotebookContext;


    render() {
        //console.log(this.props.location.pathname);
        return (
            <NavLink to={`/game/${this.props.game_id}/${this.props.id}`}>
                <div className='tab' id={this.props.id} >
                    <li className='tabName'>{this.props.tabname}</li>
                </div>
            </NavLink>
        )
    }
}