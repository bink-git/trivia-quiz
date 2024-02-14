const UserInfo = ({ user, handleLogout }) => {
  return (
    <div className="user-content">
      <p>User: {user.email}</p>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
