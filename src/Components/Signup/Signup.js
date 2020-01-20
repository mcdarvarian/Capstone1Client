import React from 'react';
import './Signup.css';
import TokenService from './../../TokenService';
import NotebookContext from './../../NotebookContext';

export default class SignUp extends React.Component {
    static contextType = NotebookContext;
    state = {
        username: '',
        password: '',
        pass_conf: ''
    }

    onUsernameChange(e) {
        e.preventDefault();
        this.setState({
            username: e.currentTarget.value
        });
    }

    onPasswordChange(e) {
        e.preventDefault();
        this.setState({
            password: e.currentTarget.value
        });

    }

    onPassConfChange(e){
        e.preventDefault();
        this.setState({
            pass_conf: e.currentTarget.value
        });
    }


    //takes the inputs makes sure all the ducks are in a row and tells the api to make a new user
    onSubmit(e) {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const pass_conf = this.state.pass_conf;
       //compares the password to make sure its correct
        if(pass_conf !== password){
            window.alert('passwords must match');
            this.setState({
                password: '',
                pass_conf: ''
            });
            return null;
        }

        TokenService.saveAuthToken(
            TokenService.makeBasicAuth(username, password)
        );
        
        return fetch(`${this.context.API_URL}/user/signUp`, {
            method: 'POST',
            headers: {
                'authorization': `basic ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    window.alert('username is take please choose a new name');
                    this.setState({
                        username: '',
                        password: '',
                        pass_conf: ''
                    });
                } else {
                    this.props.history.push('/new-game')
                }
            });

    }

    //takes you to the login page
    Login(){
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className='signup_form'>
                <h1>Sign Up!</h1>
                <form onSubmit={e => this.onSubmit(e)} >
                    <label htmlFor='username'>Username:</label>
                    <input required type='text' id='username' value={this.state.username} 
                    onChange={e => this.onUsernameChange(e)} />
                    <label htmlFor='password'>Password:</label>
                    <input required type='password' id='password' value={this.state.password}
                     onChange={e => this.onPasswordChange(e)} />
                    <label htmlFor='pass_conf'>Confirm Password:</label>
                    <input required type='password' id='pass_conf' value={this.state.pass_conf} 
                    onChange={e => this.onPassConfChange(e)}/>
                    <button type='submit'>Sign up</button>
                </form>
                <button onClick={() => this.Login()} >Or Login</button>
            </div>
        );
    }
}