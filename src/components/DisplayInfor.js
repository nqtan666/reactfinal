import React from "react";
class DisplayInfo extends React.Component {
  state = {
    isShow: true,
  };
  handleShowHide = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  render() {
    const { listUser } = this.props;
    return (
      <>
        {this.state.isShow && (
          <div>
            {listUser &&
              listUser.length &&
              listUser.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={item.age > 18 ? "red" : "green"}
                  >
                    <div> I'm - {item.name}</div>
                    <div> My age - {item.age}</div>
                    <hr />
                  </div>
                );
              })}
          </div>
        )}
        <button onClick={() => this.handleShowHide()}>
          {this.state.isShow ? "Hide" : "Show"}
        </button>
      </>
    );
  }
}
export default DisplayInfo;
