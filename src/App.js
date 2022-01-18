import logo from './logo.svg';
import './App.css';
import Table from './components/table';
import Form from './components/form';
import {Component} from 'react'

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
} 
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      characters: [],
      isLoggedIn: false
    }
    
    const timeOut = () => {
      
      return new Promise((resolve) => {
        let n = Math.floor(10*Math.random())
        console.log('n:', n);
        setTimeout(() => {
          resolve()
        }, n)
      })
    }
    const arr = [1,2,3]
    console.log(arr);
    const promises = arr.map((item, index) => {
      console.log('item/index:', item, index);
      return timeOut().then(() => {
        return item
      })
    })

    // console.log(promises);
    Promise.resolve().then(() => {
      console.log(promises);
      Promise.race(promises).then(res => {
        console.log('最先执行完毕：',res);
      })
    })
    // const promises = [Promise.resolve(2), Promise.resolve(1),Promise.resolve(0)]
    
    // const urls = [
    //   'https://t7.baidu.com/it/u=4080826490,615918710&fm=193&f=GIF',
    //   'https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF',
    //   'https://t7.baidu.com/it/u=774679999,2679830962&fm=193&f=GIF',
    //   'https://t7.baidu.com/it/u=1314925964,1262561676&fm=193&f=GIF',
    //   'https://t7.baidu.com/it/u=3694360626,2933607547&fm=193&f=GIF',
    //   'https://t7.baidu.com/it/u=407688855,3169248799&fm=193&f=GIF',
    //   'https://t7.baidu.com/it/u=1577112734,4159784366&fm=193&f=GIF',
    //   'https://t7.baidu.com/it/u=2359570649,2574326109&fm=193&f=GIF'
    // ]
    // this.limitLoad(urls, this.loadImg, 3)
  }
  loadImg (url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function () {
        resolve()
      }
      img.onerror = function () {
        reject()
      }
      img.src = url
    })
  }
  limitLoad (urls, handler, limit) {
    let sequence = [].concat(urls)
    let promises = sequence.splice(0, limit).map((url, index) => {
      return handler(url).then(() => {
        return index
      })
    })
    console.log(promises);
    return sequence.reduce(async (pCollect, url) => {
      return pCollect.then(() => {
        return Promise.race(promises)
      }).then(fastestIndex => {
        promises[fastestIndex] = handler(url).then(() => {
          return fastestIndex
        })
      }).catch(err => {
        console.log(err);
      })
    }, Promise.resolve()).then(res => {
      console.log('res:', res);
      return Promise.all(promises)
    })
  }
  handleLogoutClick () {
    console.log('handleLogoutClick')
    this.setState({
      isLoggedIn: false
    })
  }
  handleLoginClick () {
    console.log('handleLoginClick')
    this.setState({
      isLoggedIn: true
    })
  }
  render(h) {
    const {isLoggedIn} = this.state
    let button;
    if (isLoggedIn) {
      button = <LoginButton onClick={this.handleLoginClick.bind(this)} />
    } else {
      button = <LogoutButton onClick={this.handleLogoutClick.bind(this)} />
    }
    const count = 1
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {count && <h1>Messages: {count}</h1>}
          {button}
          <Form addItem={this.addItem}/>
          <Table characters={this.state.characters} removeItem={this.removeItem}/>
        </header>
      </div>
    );
  }
  removeItem = (index) => {
    const {characters} = this.state
    console.log(characters);
    this.setState({
      'characters': characters.filter((item, n) => n !== index)
    })
  }
  addItem = (obj) => {
    this.setState({
      characters: [...this.state.characters, obj]
    })
  }
}

export default App;
