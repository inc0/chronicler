import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';

import './App.css';
import ModelList from './components/ModelList';
import TopNavBar from './components/TopNavBar'


class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <TopNavBar />
        <ModelList />
      </div>
    );
  }
}

export default App;
