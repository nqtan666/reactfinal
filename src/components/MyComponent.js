import React from "react";

// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  render() {
    return <div>My Component -{Math.random()}</div>;
  }
}
export default MyComponent;
