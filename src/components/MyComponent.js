import React from "react";

// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  state = {
    name: "TanNQ",
    address: "Ha Tinh",
    age: 23,
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}
      </div>
    );
  }
}
export default MyComponent;
