import React, { useState } from "react";
// class AddUserInfor extends React.Component {
//   state = {
//     name: "",
//     age: "",
//   };

//   handleOnChangeInput = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     this.setState({
//       [name]: value,
//     });
//   };
//   handleOnSubmit = (e) => {
//     e.preventDefault();
//     this.props.handleAddUser(this.state);
//   };
//   render() {
//     return (
//       <>
//         <div>
//           My name is {this.state.name} and I'm {this.state.age}
//           {this.state.age}
//         </div>
//         <form onSubmit={(e) => this.handleOnSubmit(e)}>
//           <label>Your Name</label>
//           <input
//             onChange={(e) => this.handleOnChangeInput(e)}
//             value={this.state.name}
//             name="name"
//             type="text"
//           />
//           <label>Your Age</label>
//           <input
//             onChange={(e) => this.handleOnChangeInput(e)}
//             value={this.state.age}
//             name="age"
//             type="text"
//           />
//           <button>Submit</button>
//         </form>
//       </>
//     );
//   }
// }
const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const handleOnChangeInputName = (e) => {
    let value = e.target.value;
    setName(value);
  };
  const handleOnChangeInputAge = (e) => {
    let value = e.target.value;
    setAge(value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.handleAddUser({
      id: Math.floor(Math.random() * 100 + 1),
      name: name,
      age: age,
    });
  };
  return (
    <>
      <div>
        My name is {name} and I'm {age}
      </div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <label>Your Name</label>
        <input
          onChange={(e) => handleOnChangeInputName(e)}
          value={name}
          name="name"
          type="text"
        />
        <label>Your Age</label>
        <input
          onChange={(e) => handleOnChangeInputAge(e)}
          value={age}
          name="age"
          type="text"
        />
        <button>Submit</button>
      </form>
    </>
  );
};
export default AddUserInfor;
