import logo from './logo.svg';
import './App.css';
import Table from './components/table';
import Form from './components/form';
import {Component} from 'react'
class App extends Component {
  state = {
    characters: [],
  }
  render(h) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Form addItem={this.addItem}/>
          <Table characters={this.state.characters} removeItem={this.removeItem}/>s
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
