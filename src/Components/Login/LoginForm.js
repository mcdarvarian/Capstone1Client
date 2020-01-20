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
                <p className='landing'>Hello! Welcome to using This Table Top Role Playing Game Notebook App! Here's how to use this
                    app to the best functionality: <br />
                    -this is designed to be navigated quickly and easily by links, you could type in addresses but 
                    the intention is to be used by links <br />
                    -you can user name:demo password:demo if you dont want to sign up <br />
                    -to get to a game use /game/(gameId)/1 <br />
                    -to get to a tab (1-6) simply use /game/(gameId)/(tabNumber)<br />
                    -at the moment you are able to access other people's games (authentification partially enabled at the
                    moment due to a few bugs)<br />
                    -to view a note use /note/(gameId)/(tabNumber)/(noteId)<br />
                    -to make a note use /note/(gameId)/(tabNumber)/0<br />
                    -to update a note use /note/(gameId)/(tabNumber)/(noteId)<br />
                    -to make a game use /new-game<br />
                    -to login use /login ()<br />
                    -to signup use /signup<br />
                    -if you want to try to be tricky go to /shhh and you can delete/update other accounts 
                    (but only if you have the admin key) (there is no way to get to this page with links)
                    -have fun!!<br />
                </p>
            </div>
        );
    }
}