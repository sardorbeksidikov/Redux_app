import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="p-5 w-50 mx-auto border mt-5">
        <h1 className="pb-3 text-center">User info</h1>
        <h3 className="mb-3">Username: {user && user.username}</h3>
        <h3 className="mb-5">Password: {user && user.password}</h3>
        <button className="btn btn-outline-dark" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
