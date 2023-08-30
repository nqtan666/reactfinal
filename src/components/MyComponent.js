import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfo from "./DisplayInfor";
// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "TanNQ", age: 16 },
      { id: 2, name: "Eric", age: 30 },
      { id: 3, name: "Quoc Tan ", age: 30 },
    ],
  };
  handleAddUser = (data) => {
    this.setState({
      listUser: [...this.state.listUser, data],
    });
  };
  handleDeleteUser = (userId) => {
    const listUser = this.state.listUser.filter((item) => item.id !== userId);
    this.setState({
      listUser: listUser,
    });
  };
  render() {
    console.log("check state", this.state.listUser);
    return (
      <>
        <AddUserInfor handleAddUser={this.handleAddUser} />
        <br />
        <br />
        <DisplayInfo
          handleDeleteUser={this.handleDeleteUser}
          listUser={this.state.listUser}
        />
      </>
    );
  }
}
export default MyComponent;
