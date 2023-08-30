import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfor";
// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "TanNQ", age: 30 },
      { id: 2, name: "Eric", age: 30 },
      { id: 3, name: "Quoc Tan ", age: 30 },
    ],
  };
  render() {
    return (
      <>
        <UserInfo />
        <br />
        <br />
        <DisplayInfo listUser={this.state.listUser} />
      </>
    );
  }
}
export default MyComponent;
