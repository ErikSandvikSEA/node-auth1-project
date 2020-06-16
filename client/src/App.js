import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './components/Login'
import UsersList from './components/UsersList'


function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route path='/UsersList'>
            <UsersList />
          </Route>
          
          <Route path='/'>
            <Login />
          </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;