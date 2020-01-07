import React from 'react';
import TokenService from './../../TokenService'
import './Login.css'
import NotebookContext from './../../NotebookContext'

export default class LoginForm extends React.Component{
    static contextType = NotebookContext;
    state ={
        username: '',
        password: ''
    }

    onUsernameChange(e){
        e.preventDefault();
        this.setState({
            username: e.currentTarget.value
        })
    }

    onPasswordChange(e){
        e.preventDefault();
        this.setState({
            password: e.currentTarget.value
        })
        console.log(this.state.password);
    }

    submitLogin(e){
        e.preventDefault();
        const {username, password } = e.target;

        TokenService.saveAuthToken(
            TokenService.makeBasicAuth(username.value, password.value)
        );
        username.value = ''
        password.value = ''

        return fetch(`${this.context.API_URL}/user/login`, {
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>{
                if(!res.ok){
                    console.log(':(')
                }
                console.log(':)')
            })
    }



    render(){
        return(
            <div className='login'>
                <h1 className='title'>Log in</h1>
                <form onSubmit={e => this.submitLogin(e)}>
                    <label htmlFor='username'>Username:</label>
                    <input required type='text' id='username' value={this.state.username} onChange={e=> this.onUsernameChange(e)} />
                    <label htmlFor='password'>Password:</label>
                    <input required type='text' id='password' value={this.state.password} onChange={e => this.onPasswordChange(e)} />
                    <button type='submit' className='login_button' >Login</button>
                </form>
            </div>
        )
    }
}