import React, { Component } from 'react';
import '../App.css'
import maps from '../maps/minesweeper'

class Minesweeper extends Component {
  constructor() {
    super() 
    this.state = {
      map: maps.beginner.map,
      mines: [],
      dead: false,
      numMine: maps.beginner.mines
    }
  }
  componentDidMount() {
    this.setMines(this.state.map, this.state.numMine)
  }

  setMines = (mapStart, numMines) => {
    let mines = []
    let map = mapStart.slice()
    for(let i = 0; i < numMines; i++) {
      let mine = []
      let flag = true
      while(flag) {
        let secondFlag = false
        mine[0] = ~~(Math.random() * (map.length - 1)) + 1
        mine[1] = ~~(Math.random() * (map.length - 1)) + 1
        mines.forEach(m => {
          if(m[0] === mine[0] && m[1] === mine[1]) {
            secondFlag = true
          }
        })
        if(!secondFlag){
          mines.push(mine)
          map[mine[0]][mine[1]] = '*'
          flag = false
        } 
      }
    }
    for(let i = 0; i < map.length; i++) {
      let row = map[i]
      // console.log(map[i])
      // console.log(row)
      for(let f = 0; f < row.length; f++) {
        let points = {
          tl: [i - 1, f - 1],
          tc: [i - 1, f],
          tr: [i - 1, f + 1],
          ml: [i, f - 1],
          mr: [i, f + 1],
          bl: [i + 1, f - 1],
          bc: [i + 1, f],
          br: [i + 1, f + 1],
        }
        if(row[f] === '*') {
          for(let prop in points) {
            if(map[points[prop][0]] && map[points[prop][0]][points[prop][1]] >= 0){
              map[points[prop][0]][points[prop][1]]++
            }
          }
        }
      }
    }
    this.setState({mines, map, dead: false})
  }

  handleClick = (f, i) => {
    let map = this.state.map.slice()
    if(map[f][i] === '*') {
      this.setState({dead: true})
      alert('You Done Fucked Up!!!!')
    } else if(map[f][i] > 0) {
      map[f][i] += 10
      this.setState({map})
    } else if (map[f][i] === 0){
      map[f][i] += 10
      console.log('prop', map)
      map = this.updateMap(f, i, map)
      this.setState({map})
    }
  }

  updateMap = (f, i, map) => {
    let points = {
      tl: [f - 1, i - 1],
      tc: [f - 1, i],
      tr: [f - 1, i + 1],
      ml: [f, i - 1],
      mr: [f, i + 1],
      bl: [f + 1, i - 1],
      bc: [f + 1, i],
      br: [f + 1, i + 1],
    }
    for(let prop in points) {
      if(points[prop][0] >= 0 && points[prop][0] < map.length && points[prop][1] >= 0 && points[prop][1] < map.length ) {
        if(map[points[prop][0]][points[prop][1]] > 0 && map[points[prop][0]][points[prop][1]] < 10){
          map[points[prop][0]][points[prop][1]] += 10
        } else if(map[points[prop][0]][points[prop][1]] === 0 ) {
          map[points[prop][0]][points[prop][1]] += 10
          map = this.updateMap(...points[prop], map)
        }
      }
    }
    return map
  }

  handleChange = (e) => {
    let {value} = e.target
    this.setMines(maps[value].map, maps[value].mines)
  }

  render() {
    let count = 0
    let map = this.state.map.map((r, f) => {
      let row = r.map((c, i) => {
        if(this.state.dead){
          if(c === '*') {
            return(
              <div className='cube' style={{backgroundColor: 'red'}} key={i}></div>
            )
          } else {
              return(
                <div className='cube' style={{backgroundColor: 'black'}} key={i}></div>
              )
          }
        } else if(c > 10){
          count++
            return(
              <div className='cube' style={{backgroundColor: 'white', color: 'black'}} key={i}>{c - 10}</div>
            )
        } else if (c === 10) {
          count++
          return (
            <div className='cube' style={{backgroundColor: 'white'}} key={i}></div>
          )
        } else {
          if(c === '*') count++
          return(
            <div onClick={() => this.handleClick(f, i)} className='cube' style={{backgroundColor: 'black'}} key={i}></div>
          )
        }
      })
      return (
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}} key={f}>
          {row}
        </div>
      )
    })
    if(count === this.state.map.length * this.state.map.length){
      alert('You did it!!!!!')
    }
    return (
      // <div style={{height: '100vh', width: '100vw'}}>
        <div style={{height: '100vh', width: '100vw', outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'purple'}} tabIndex="0">
        <select onChange={this.handleChange}>
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='expert'>Expert</option>
        </select>
          {map}
        </div>
      // </div>
    );
  }
}

export default Minesweeper;
