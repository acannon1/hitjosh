import React from 'react';
import logo from './logo.svg';
import './App.css';
import pic from './josh.jpg'


class Square extends React.Component {

  render() {
    // const tank = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkx1sF9qbwEuzijeIjfDDOhNJoUDYnKxkJ2g&usqp=CAU"; 
    const tank = "https://www.berluti.com/on/demandware.static/-/Sites-masterCatalog_Berluti/default/dwb15a136a/images/S4917-001_brunico-leather-boot_ice-brown_berluti_01.jpg"
    
    // const bullsEye = "https://thumbs.dreamstime.com/z/target-bullseye-bulls-eye-9468250.jpg";
    const bullsEye = pic


    const hit1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtOKgsN9PqUT1RxR6j4GVeniJNv9LiWimoAw&usqp=CAU";
    
    const hit2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfuioI3plik1RwxMC-7Bw9_kKJWjq7GoS1gw&usqp=CAU";
    
    return (
      <div className='square'>
        {/*this.props.id*/}
        {
          this.props.hit ?
            <img src={hit1} height="400" /> :
            this.props.bullet ? 
              <img src={tank} height="400" /> : 
              this.props.bullsEye ? 
                <img src={bullsEye} height="400" /> :
                  null
        }
      </div>
    )
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // size: 5,
      target: 0,
      direction: "down",
      bullet: 10,
      bulletStart: 10,
      shotFired: false,
      targetHit: false,
      intervalId: 0,
      bulletIntervalId: 0,
    }
  }
  
  componentDidMount() {
    this.setState({
      intervalId: setInterval(this.moveTarget.bind(this), 1000),
      target: (this.props.size - 1),
      bullet: (this.props.size),
      bulletStart: (this.props.size)
    });
  }
  
  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }
  
  stop() {
    clearInterval(this.state.intervalId);
    clearInterval(this.state.bulletIntervalId);
  }
  
  moveBullet() {
    let targetHit = this.state.targetHit;
    let bullet = this.state.bullet;
    bullet += 1;
//     if(bullet == this.state.target) {
//       console.log("Hit")
//       targetHit = true;
//       stop()
      
//     }
    if(bullet > (this.state.bulletStart + this.props.size - 1)) {
      bullet = this.state.bulletStart;
      clearInterval(this.state.bulletIntervalId);
    }
    this.setState({bullet, targetHit});
  }
  
  moveTarget() {
    let target = this.state.target;
    let direction = this.state.direction;
    const maxSquares = Math.pow(this.props.size, 2);
    
    if(direction == "down") {
      target += this.props.size;
      if(target > maxSquares - 1) {
        direction = "up";
        target =  maxSquares - 1 - this.props.size;
      }
    } else {
      target -= this.props.size;
      if(target < this.props.size - 1) {
        direction = "down";
        target = (this.props.size * 2) - 1
      }
    }
    
    this.setState({target, direction})
  }
  
  createGrid() {
    let grid = new Array(this.props.size);
    let counts = 0;
    for (let i=0; i<this.props.size; i++) {
      grid[i] = new Array(this.props.size)
      for (let j=0; j<this.props.size; j++) {
        grid[i][j] = counts++;
      }
    }
    
    return (
      grid.map((value, index) => {
        return(
          <div className="board-row">
          {
            value.map((v, i) => {
              return(
                <Square
                  id = {v}
                  tank={false}
                  bullet={v === this.state.bullet}
                  bullsEye={v === this.state.target}
                  hit={(v === this.state.target) & (this.state.bullet === this.state.target)}
                />
              )
            })
          }
          </div>
        )
      })
    )
  }
  
  fireShot() {
    this.setState({bulletIntervalId: setInterval(this.moveBullet.bind(this), 500)});
  }
  
  start() {
    this.setState({intervalId: setInterval(this.moveTarget.bind(this), 1000)});
  }
  
  render() {
    const win = ""
    return (
      <div>
        {this.createGrid()}
        <div>
          <button onClick={() => this.fireShot()}> Shoot </button>
          <button onClick={() => this.start()}> Start </button>
          <button onClick={() => this.stop()}> Stop </button>
        </div>
      </div>
    )
  }  
}

// class Game extends React.Component {
//   render() {
//     return (
//       <Board size={15}/>
//     )
//   }  
// }




function App() {
  return (
    <div className="App">
      <Board size={10}/>
    </div>
  );
}

export default App;
