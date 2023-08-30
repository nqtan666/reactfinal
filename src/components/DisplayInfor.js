import React from "react";
import "./DisplayInfor.scss";
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
      <div className="display-infor-container">
        {this.state.isShow && (
          <div>
            {listUser &&
              listUser.length &&
              listUser.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={item.age > 18 ? "green" : "red"}
                  >
                    <div> I'm - {item.name}</div>
                    <div> My age - {item.age}</div>
                    <hr />
                  </div>
                );
              })}
          </div>
        )}
        <div>
          <button onClick={() => this.handleShowHide()}>
            {this.state.isShow ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    );
  }
}
export default DisplayInfo;
