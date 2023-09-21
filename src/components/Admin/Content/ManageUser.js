import Example from "./ModelCreateUser";
const ManageUser = () => {
  return (
    <div classNameName="manage-user-container">
      <div classNameName="title">ManageUser</div>
      <div classNameName="users-content">
        <div>
          <button>Add user</button>
        </div>
        <div>
          table users
          <Example />
        </div>
      </div>
    </div>
  );
};
export default ManageUser;
