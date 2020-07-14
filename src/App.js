import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

let API_ENDPOINT = `http://localhost:6001/songs`

class App extends React.Component {
  state = {
    songs: []
  }

  getAllSongs = () => {
    fetch(API_ENDPOINT)
    .then(r => r.json())
    .then(data => {this.setState({
      songs: data
    })})
  }

  handleUpdateFav = (id, favorite) => {
    fetch(`http://localhost:6001/songs/${id}`,{
    method: 'PATCH',
    headers: {
        'content-type':'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
        favorite: !favorite
    })
    })
    .then( r => r.json())
    .then(data => {
        // inside of App.js, this.setState to update songs    
        console.log(data)
        // find the right song using the ID
        // update just that song inside of the array / replace with the new data 
        // 1. find the index of the correct song===> so that we can replace it later 
        let targetSongIndex = this.state.songs.findIndex(song => song.id === data.id)
        let copySongs = [...this.state.songs] // DO NOT MUTATE STATE - NEED TO MAKE A COPY FIRST 
        copySongs[targetSongIndex] = data 
        this.setState({ songs: copySongs})
    })
}
  
  renderNav = () => {
    return (
      <div className="simple-flex-row">
        <button onClick={this.getAllSongs}>Get Songs</button> 
        <h1>S-not-ify 🐽</h1>
        <input placeholder="Search by title or artist..."/>
      </div>
    )
  };
  

  render(){
    console.log(this.state.songs);
    
    return (
      <div className="App">
        {this.renderNav()} {/** The renderNav method renders a div holding the button to get songs and the title */}
        <MainContainer songs={this.state.songs} handleUpdateFav={this.handleUpdateFav}/> 
      </div>
    );
  }
}

export default App;
