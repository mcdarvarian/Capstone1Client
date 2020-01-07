import React from 'react';

export default class NoteBig extends React.Component {

    render() {
        return (
            <div className='expanded_note'>
                <h3 className='note_title'>
                    {this.props.name}
                </h3>
                <p className='note_content'>
                    {this.props.contents}
                </p>
            </div>
        )
    }
}