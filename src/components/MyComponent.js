import React from "react";

// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  state = {
    name: "TanNQ",
    address: "Ha Tinh",
    age: 23,
  };
  handleClick = () => {
    this.setState({
      name: "AAAA",
      age: Math.floor(Math.random() * 100),
    });
  };
  handleOnMoverOver(event) {
    console.log(event.screenX);
  }
  render() {
    console.log(">>>>check state :", this.state);
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address} age :{" "}
        {this.state.age}
        <button onClick={() => this.handleClick()}>Click Me</button>
        <button onMouseOver={(e) => this.handleOnMoverOver(e)}>HoverMe</button>
      </div>
    );
  }
}
export default MyComponent;
