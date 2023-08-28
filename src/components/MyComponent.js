import React from "react";
import UserInfo from "./UserInfo";
// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  render() {
    return (
      <>
        <UserInfo />
      </>
    );
  }
}
export default MyComponent;
