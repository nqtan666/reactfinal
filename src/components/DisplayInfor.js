import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
// class DisplayInfo extends React.Component {
//   render() {
//     const { listUser } = this.props;
//     return (
//       <div className="display-infor-container">
//         {true && (
//           <div>
//             {listUser &&
//               listUser.map((item) => {
//                 return (
//                   <div
//                     key={item.id}
//                     className={item.age > 18 ? "green" : "red"}
//                   >
//                     <div> I'm - {item.name}</div>
//                     <div> My age - {item.age}</div>
//                     <button onClick={() => this.handleDelete(item.id)}>
//                       delete
//                     </button>
//                     <hr />
//                   </div>
//                 );
//               })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }
const DisplayInfo = (props) => {
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const { listUser } = props;
  const handleDelete = (id) => {
    props.handleDeleteUser(id);
  };
  const handleShowHide = () => {
    setShowHideListUser(!isShowHideListUser);
  };
  console.log(">>>call me render");
  useEffect(() => {
    console.log(">>>call me useEffect");
    if (listUser.length === 0) {
      alert("You delete all");
    }
  }, [listUser]);
  return (
    <div className="display-infor-container">
      {isShowHideListUser && (
        <div>
          {listUser &&
            listUser.map((item) => {
              return (
                <div key={item.id} className={item.age > 18 ? "green" : "red"}>
                  <div> I'm - {item.name}</div>
                  <div> My age - {item.age}</div>
                  <button onClick={() => handleDelete(item.id)}>delete</button>
                  <hr />
                </div>
              );
            })}
        </div>
      )}
      <div>
        <button onClick={() => handleShowHide()}>
          {isShowHideListUser ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};
export default DisplayInfo;
