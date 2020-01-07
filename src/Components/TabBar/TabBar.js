import React from 'react';
import NotebookContext from '../../NotebookContext';
import Tab from './Tab'
import './TabBar.css';



export default class TabBar extends React.Component{
    static contextType = NotebookContext;

    render() {
        const tabs = this.context.tabs;
        const list = tabs.map(tab => {
            return <Tab game_id={this.props.game} id={tab.id} key={tab.id} tabname={tab.tabname} />
        })
        return(
            <div className='tab_bar'>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}