import { Component } from "react";
class Form extends Component {
  state = {
      name: '',
      job: ''
  }
  render(h) {
    const {name, job} = this.state
    return (
      // {this.state}
      <div>
        <form>
          
          <label htmlFor="name">name</label>
          <input autocomplete="off" type="text" name="name" value={name} onChange={this.handlerChange} />
          <label htmlFor="job">job</label>
          <input autocomplete="off" type="text" name="job" value={job} onChange={this.handlerChange} />
          <input type="button" value="Submit" onClick={this.submitForm} />
        </form>
      </div>
    )
  }
  handlerChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
  submitForm = () => {

    const {addItem} = this.props
    addItem(this.state)
    // this.setState()
  }
}
export default Form