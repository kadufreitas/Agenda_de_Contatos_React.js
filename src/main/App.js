import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Agenda from '../agenda/agenda'
import {Container} from 'react-bootstrap'
import './App.css';

class App extends Component {  
  render() {
    return (
      <div className="App">
        
        <Container>
          <Agenda />
        </Container>
      </div>
    );
  }
}

export default App;
