import React from "react";
class UserInfo extends React.Component {
  state = {
    name: "",
    age: "",
  };

  handleOnChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(">>>check state", this.state);
  };
  render() {
    return (
      <>
        <div>
          My name is {this.state.name} and I'm {this.state.age}
          {this.state.age}
        </div>
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <label>Your Name</label>
          <input
            onChange={(e) => this.handleOnChangeInput(e)}
            value={this.state.name}
            name="name"
            type="text"
          />
          <label>Your Age</label>
          <input
            onChange={(e) => this.handleOnChangeInput(e)}
            value={this.state.age}
            name="age"
            type="text"
          />
          <button>Submit</button>
        </form>
      </    >
    );
  }
}
export default UserInfo;
