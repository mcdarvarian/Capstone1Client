import React from 'react';
import './Signup.css'

export default class SignUp extends React.Component{
    state ={
        username: '',
        password: ''
    }

    onUsernameChange(e){
        e.preventDefault();
        console.log(this.state.username, this.state.password)
        this.setState({
            username: e.currentTarget.value
        })
    }  

    onPasswordChange(e){
        e.preventDefault();
        console.log(this.state.username, this.state.password)
        this.setState({
            password: e.currentTarget.value
        })
        
    }

    onSubmit(e){
        e.preventDefault();
    }

    render(){
        return(
            <div className='signup_form'>
                <h1>Sign Up!</h1>
                <form onSubmit={e => this.onSubmit(e)} >
                    <label htmlFor='username'>Username:</label>
                    <input type='text' id='username' value={this.state.username} onChange={e => this.onUsernameChange(e)} />
                    <label htmlFor='password'>Password:</label>
                    <input type='text' id='password' value={this.state.password} onChange={e => this.onPasswordChange(e) } />
                    <button type='submit'>Sign up</button>
                </form>
            </div>
        )
    }
}