import React from 'react';

export default class MissingPage extends React.Component{

    goBack(){
        
        this.props.history.goBack();
    }

    goHome(){
        this.props.history.push('/');
    }

    //this is the page that you go to if you go to the wrong page, has a back and a home select
    render(){
        return(
            <div className='404'>
                <h1>this page wasnt found, 
                    <div onClick={()=> this.goBack()}>click here to go back</div>
                    <div onClick={() => this.goHome()}>click here to go home</div>
                </h1>
            </div>
        );
    }
}