import React from 'react';
import TokenService from './../../TokenService';
import './Login.css';
import NotebookContext from './../../NotebookContext';

export default class LoginForm extends React.Component{
    static contextType = NotebookContext;
    state = {
        username: '',
        password: ''
    };

    onUsernameChange(e){
        e.preventDefault();
        this.setState({
            username: e.currentTarget.value
        });
    }

    onPasswordChange(e){
        e.preventDefault();
        this.setState({
            password: e.currentTarget.value
        });
    }

    //check the login on the api, if the user is valid, go to the home page, otherwise tell the user their login is wrong
    submitLogin(e){
        e.preventDefault();
        const {username, password } = e.target;

        TokenService.saveAuthToken(
            TokenService.makeBasicAuth(username.value, password.value)
        );
        username.value = '';
        password.value = '';

        return fetch(`${this.context.API_URL}/user/login`, {
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>{
                if(!res.ok){
                    window.alert('invalid login');
                } else {
                    this.props.history.push('/');
                }
            });
    }

    //send the user to the signup page
    SignUp(){
        this.props.history.push('/signup');
    }



    render(){
        return(
            <div className='login'>
                <h1 className='title'>Log in</h1>
                <form onSubmit={e => this.submitLogin(e)}>
                    <label htmlFor='username'>Username:</label>
                    <input required type='text' id='username' value={this.state.username} 
                    onChange={e=> this.onUsernameChange(e)} />
                    <label htmlFor='password'>Password:</label>
                    <input required type='password' id='password' value={this.state.password} 
                    onChange={e => this.onPasswordChange(e)} />
                    <button type='submit' className='login_button' >Login</button>
                </form>
                <button className='sign_up' onClick={() => this.SignUp()} >Sign Up</button>
                <p className='landing'>Howdy! This application is used to take notes for a Table Top RolePlaying Game!<br/><br/>
                If you don't play too many of those this may not be for you, but if you do then welcome!!<br/><br/>
                If you want to just demo the site, use username: <b>demo</b> password: <b>demo</b>  to log in and play around.<br/><br/>
                You can make a game, or select from one of the games that already exist. Once you're in, you can navigate<br/><br/>
                between sections by clicking on tabs on the side, and make or edit notes as you see fit! Have fun!<br/><br/>
                </p>
            </div>
        );
    }
}