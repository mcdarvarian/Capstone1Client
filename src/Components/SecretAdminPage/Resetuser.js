import React from 'react';
import NotebookContext from './../../NotebookContext'

export default class SecretPage extends React.Component {
    static contextType = NotebookContext;
    SubmitChanges(e) {
        e.preventDefault();
        let { old_username, new_username, new_password, admin_key } = e.currentTarget;

        old_username = old_username.value;
        new_username = new_username.value;
        new_password= new_password.value;
        admin_key = admin_key.value;

        const nameChanger = { old_username, new_username, new_password, admin_key}

        return fetch(`${this.context.API_URL}/user/admin`, {
            method: 'PATCH',
            body: JSON.stringify(nameChanger),
            headers: {
                'content-type' : 'application/json'
            }
        })
    }

    DeleteUser(e){
        e.preventDefault();
        let {username, password, admin_key} = e.currentTarget;

        username= username.value;
        password = password.value;
        admin_key = window.btoa(admin_key.value);

        const nameDelete = {username, password, admin_key}
        return fetch (`${this.context.API_URL}/user/admin`, {
            method: 'DELETE',
            body: JSON.stringify(nameDelete),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res =>{
            window.alert(`deleted ${username}`);
            console.log(res);
        })
    }

    render() {
        return (
            <div className='shhh'>
                <form onSubmit={e => this.SubmitChanges(e)}>
                    <label  htmlFor='old_username' >old</label>
                    <input required id='old_username' defaultValue='' />
                    <label htmlFor='new_username' >new User</label>
                    <input required id='new_username' defaultValue='' />
                    <label htmlFor='new_password' >new Pass</label>
                    <input required id='new_password' type='password' defaultValue='' />
                    <label htmlFor='admin_key' >Admin?</label>
                    <input required id='admin_key' defaultValue='' />
                    <button type='submit' >Submit Changes</button>
                </form>

                <form onSubmit={e => this.DeleteUser(e)} >
                    <label htmlFor='username' >Username</label>
                    <input required id='username' defaultValue='' />
                    <label htmlFor='password' >Password</label>
                    <input required id='password' defaultValue='' />
                    <label htmlFor='admin_key' >Admin?</label>
                    <input required id='admin_key' defaultValue='' />
                    <button type='submit' >Submit Changes</button>
                </form>
            </div>
        )
    }
}