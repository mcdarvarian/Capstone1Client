import React from 'react';

export default class MissingPage extends React.Component{

    goBack(e){
        
        this.props.history.goBack();
    }

    goHome(){
        this.props.history.push('/')
    }

    render(){
        return(
            <div className='404'>
                <h1>this page wasnt found, 
                    <div onClick={e=> this.goBack(e)}>click here to go back</div>
                    <div onClick={() => this.goHome()}>click here to go home</div>
                </h1>
            </div>
        )
    }
}