import React, { Component } from 'react';
import './App.css';
import './reset.css';
import Tetris from './components/Tetris'
import Snake from './components/Snake'
import MineSweeper from './components/Minesweeper'

class App extends Component {
  constructor() {
    super()
    this.state = {
      game: 'Tetris'
    }
  }

  handleGameChange(game) {
    this.setState({game})
  }

  render() {
    return (
      <div className='app'>
        <select onChange={e => this.handleGameChange(e.target.value)}>
          <option value={'Tetris'} >Tetirs</option>
          <option value={'Snake'} >Snake</option>
          <option value={'MineSweeper'} >Minesweeper</option>
        </select>
        {this.state.game === 'Tetris' && <Tetris />}
        {this.state.game === 'Snake' && <Snake />}
        {this.state.game === 'MineSweeper' && <MineSweeper />}
      </div>
    );
  }
}

export default App;
