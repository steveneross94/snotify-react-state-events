import React from 'react';
import SongList from './SongList';
import Queue from './Queue';

const MainContainer = props => {
    console.log(props);
    
    return (
        <div className="simple-flex-row top">
            <SongList songs={props.songs}/> 
            <Queue /> {/** TODO: What props do I need? */}
        </div>
    )
}

export default MainContainer;