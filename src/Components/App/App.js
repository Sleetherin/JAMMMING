import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Spotify } from "../../util/Spotify";

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
    searchResults: [
        {
          name:"It is mine",
          artist:"Lunaria O Feniksi",
          album:"Songs of weird",
          id:1,
        },
        {
          name:"Phantims are smelly",
          artist:"Bella Contella",
          album:"Architectural dreams",
          id:2,
        },
      ],
      playlistName:"Example Playlist",
      playlistTracks:[
        {
          name:"29th of February",
          artist:"Alexandri O Chameria",
          album:"Chingaboom Chi Chi Cha-Cha",
          id:3,
        },
        {
          name:"Starting at your birthday",
          artist:"Hannah D'Angelo",
          album:"Kim Possible",
          id:4,
        },
        {
          name:"Underworld",
          artist:"Osiris O Nentoka",
          album:"Treasures of the world",
          id:5,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track)
  {
    const foundTrack = this.state.playlistTracks.find(
      (playlistTrack) => playlistTrack.id === track.id);
    const newTrack = this.state.playlistTracks.concat(track);
    foundTrack
     ? console.log("Track already exists")
     : this.setState({playlistTracks: newTrack});
    
  }

  removeTrack(track)
  {
    const isPresent = this.state.playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    this.setState({playlistTracks: isPresent});
  }

  updatePlaylistName(name)
  {
     this.setState({playlistName: name})
  }

  savePlaylist()
  {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    const name = this.state.playlistName;
    Spotify.savePlaylistName(name, trackURIs)
    .then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      })
    })
  }

  search(term)
  { 
    Spotify.search(term)
    .then((result) => {
       this.setState({
        searchResults: result
       })
    });
  }

 

  render()
  {
    return(
      <>
      <header>
        <h1>JAMMMING</h1>
        <h4>Save Your Songs to Spotify</h4>
        <SearchBar onSearch={this.search}/>
      </header>
      <div className="bodyStyle">
        <SearchResults 
        searchResults={this.state.searchResults} 
        onAdd={this.addTrack}
        />
        <Playlist 
        playlistName={this.state.playlistName} 
        playlistTracks={this.state.playlistTracks} 
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlaylist}
        />
      </div>
    </>
    )
  }
}

export default App;