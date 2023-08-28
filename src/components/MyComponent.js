import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfor";
// truoc 16.8 se dung class component
// sau 16.8 se dung function component

class MyComponent extends React.Component {
  render() {
    let myInfo = ["ab", "c", "c"];
    return (
      <>
        <UserInfo />
        <br />
        <br />
        <DisplayInfo name="TanNQ" age="30" />
        <hr />
        <DisplayInfo name="TanNQ" age={26} myInfo={myInfo} />
      </>
    );
  }
}
export default MyComponent;
