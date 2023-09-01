import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
class DisplayInfo extends React.Component {
  constructor(props) {
    console.log("call contructor 1");
    super(props);
    this.state = {
      isShow: true,
    };
  }
  handleShowHide = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  handleDelete = (id) => {
    this.props.handleDeleteUser(id);
  };
  componentDidMount() {
    console.log(">>>>>call me componenDidmout");
    setTimeout(() => {
      document.title = "TanNQ";
    }, 3000);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(">>>check component DidUpdate", this.props, prevProps);
    if (this.props.listUser !== prevProps.listUser) {
      if (this.props.listUser.length === 5) {
        alert("You got 5 user");
      }
    }
  }
  render() {
    const { listUser } = this.props;
    console.log("call render 2");
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
