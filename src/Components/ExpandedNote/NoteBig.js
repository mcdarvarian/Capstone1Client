import React from 'react';

export default class NoteBig extends React.Component {

    render() {
        return (
            <div className='expanded_note'>
                <h3 className='note_title'>
                    {this.props.name}
                </h3>
                <div className='note_content'>
                    {this.props.contents}
                </div>
            </div>
        )
    }
}