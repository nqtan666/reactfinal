import React from "react";

// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  state = {
    name: "",
    age: "",
  };
  handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(">>>check state", this.state);
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age}
        {this.state.age}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            onChange={(e) => this.handleOnChange(e)}
            value={this.state.name}
            name="name"
            type="text"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default MyComponent;
