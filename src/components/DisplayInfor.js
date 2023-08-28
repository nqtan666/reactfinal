import React from "react";
class DisplayInfo extends React.Component {
  render() {
    const { name, age } = this.props;
    return (
      <>
        <div>My name is {name}</div>
        <div>My age :{age}</div>
      </>
    );
  }
}
export default DisplayInfo;
