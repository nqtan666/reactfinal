import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
class DisplayInfo extends React.Component {
  state = {
    isShow: true,
  };
  handleShowHide = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  handleDelete = (id) => {
    this.props.handleDeleteUser(id);
  };
  render() {
    const { listUser } = this.props;
    return (
      <div className="display-infor-container">
        {this.state.isShow && (
          <div>
            {listUser &&
              listUser.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={item.age > 18 ? "green" : "red"}
                  >
                    <div> I'm - {item.name}</div>
                    <div> My age - {item.age}</div>
                    <button onClick={() => this.handleDelete(item.id)}>
                      delete
                    </button>
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
