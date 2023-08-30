import React from "react";
class DisplayInfo extends React.Component {
  render() {
    const { listUser } = this.props;
    return (
      <>
        {listUser &&
          listUser.length &&
          listUser.map((item) => {
            return (
              <div key={item.id}>
                <div> I'm - {item.name}</div>
                <div> My age - {item.age}</div>
                <hr />
              </div>
            );
          })}
      </>
    );
  }
}
export default DisplayInfo;
