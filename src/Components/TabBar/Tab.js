import React from 'react';
import { NavLink } from 'react-router-dom';
import NotebookContext from '../../NotebookContext';
import './TabBar.css';

export default class Tab extends React.Component {
    static contextType = NotebookContext;


    render() {
        return (
            <NavLink className='tab' to={`/game/${this.props.game_id}/${this.props.id}`}>
                <div  id={this.props.id} >
                    <li className='tabName'>{this.props.tabname}</li>
                </div>
            </NavLink>
        );
    }
}