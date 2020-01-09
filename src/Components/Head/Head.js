import React from 'react';
import TokenService from '../../TokenService'
import {NavLink} from 'react-router-dom'
import './Head.css'
export default class Head extends React.Component {
    
    logOut(){
        TokenService.clearAuthToken();
    }

    render(){
        return(
            <NavLink className='head' to={'/login'}>
                <p className='logout' onClick={() => this.logOut()}>Log Out</p>
            </NavLink>
        )
    }
}