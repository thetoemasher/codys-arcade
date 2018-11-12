import React, { Component } from 'react';
import '../App.css'
import maps from '../maps/snake'

class Snake extends Component {
  constructor() {
    super()    
    let {five} = maps
    this.state = {
      map: five.map,
      head: five.start,
      dot: null,
      snake: [five.start] ,
      direction: null,
      isMoving: null,
      dotCount: 0,
      speed: 500,
    }
  }

  componentDidMount() {
    this.getDot()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.dot) {
      let indexes = []
      this.state.map.forEach(r => {
        indexes.push(r.indexOf(0))
      })
      let total = indexes.reduce((a, b) => a + b, 0)
      if(total > ~(this.state.map.length -3)) {
        if(this.state.dot[0] === 0 && this.state.dot[1] === 0) {
          this.getDot()
        } 
      }else {
        alert("You did the thing!")
        window.location.reload()
      }
    }
  }

  getDot = () => {
    let dot = []
    let map = this.state.map.slice()
    dot[0] = ~~(Math.random() * (map.length - 1)) + 1
    dot[1] = ~~(Math.random() * (map.length - 1)) + 1
    while (this.state.map[dot[0]][dot[1]] === 1 || this.state.map[dot[0]][dot[1]] === 2){
      dot[0] = ~~(Math.random() * (map.length - 1)) + 1
      dot[1] = ~~(Math.random() * (map.length - 1)) + 1
    }
    map[dot[0]][dot[1]] = 3
    this.setState({map, dot})
  }

  handleKeyPress = (e) => {
    if(/[wasd]/.test(e)){
      let head = this.state.head.slice()
      if(e === 'w') head[0]--
      if(e === 's') head[0]++
      if(e === 'a') head[1]--
      if(e === 'd') head[1]++
      let dot = this.state.dot.slice()
      let length = this.state.length
      let snake = this.state.snake.slice()
      let map = this.state.map.slice()
      let {dotCount, speed} = this.state
      if(head[0] === dot[0] && head[1] === dot[1]) {
        dot = [0, 0]
        dotCount++
        if(speed > 0) {
          speed -= 5
        }
        length++
        snake.unshift(head)
      } else {
        snake.unshift(head)
        let tail = snake.pop(snake.length - 1)
        map[tail[0]][tail[1]]= 0
      }
      if(map[head[0]][head[1]] === 1 || map[head[0]][head[1]] === 2){
        alert("You Fail")
        window.location.reload()
      }
      map[head[0]][head[1]] = 2
      this.setState({head, map, dot, length, snake, dotCount, speed})
    }
  }

  keyDown = (e) => {
    let {speed} = this.state
    let {handleKeyPress} = this
    let dir = e.key
    if(dir === 'ArrowLeft') dir = 'a'
    if(dir === 'ArrowUp') dir = 'w'
    if(dir === 'ArrowRight') dir = 'd'
    if(dir === 'ArrowDown') dir = 's'
    let timeout = 100
    if(speed < 100) timeout = speed

    if(dir !== this.state.direction) {
      clearInterval(this.state.isMoving)
      if(/[wasd]/.test(dir)){
        setTimeout(() => {
          handleKeyPress(dir)
        }, timeout)
        this.setState({direction: dir, 
          isMoving: setInterval(() => {
          handleKeyPress(dir)
        }, speed),
        speed
        })
      }
    }
  }

  handleSelect = (e) => {
    let {dot} = this.state
    let size = maps[e.target.value]
    let map = size.map.slice()
    map[dot[0]][dot[1]] = 3
    this.setState({map: size.map, head: size.start, snake: [size.start]})
  }

  render() {
    
    let map = this.state.map.map((r, f) => {
      let row = r.map((c, i) => {
        if(c === 0) {
          return(
            <div className='cube-snake' style={{backgroundColor: 'black'}} key={i}></div>
          )
        } else if(c === 2){
          return(
            <div className='cube-snake' style={{backgroundColor: 'white'}} key={i}></div>
          )
        } else if(c === 3) {
          return(
            <div className='cube-snake' style={{backgroundColor: 'red'}} key={i}></div>
          )
        }
      })
      return (
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}} key={f}>
          {row}
        </div>
      )
    })
    return (
    <div style={{backgroundColor: 'purple', height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <select onChange={this.handleSelect} style={{width: '100px'}}>
        <option value='five'>5X5</option>
        <option value='eleven'>11X11</option>
        <option value='twenty_five'>25X25</option>
      </select>
      <div onKeyDown={this.keyDown} style={{outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} tabIndex="0">
        {map}
      </div>
    </div>
    );
  }
}

export default Snake;
