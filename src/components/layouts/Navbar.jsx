import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import ProfiePicture from "../ProfilePicture";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };
  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="navbar fixed z-50 top-0 glass lg:px-20">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case md:text-3xl font-thin text-2xl p-0 font-pacifico text-secondary"
        >
          SpiceBox
        </Link>
        <div className="ml-4 mt-2"></div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal justify-center px-1">
          <li tabIndex="0">
            <span>
              Menu
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </span>
            <ul className="py-2 lg:p-2 bg-base-100 shadow">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/recipes/random"}>Random Recipe</Link>
              </li>
              <li>
                <Link to={"/recipes"}>All Recipes</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle hover:bg-pink-400 avatar"
          >
            <div className="w-10 rounded-full">
              <ProfiePicture />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              {user ? (
                <Link to={`/${user?.user_metadata.username}`}>
                  {user?.user_metadata.username}
                </Link>
              ) : (
                <Link to="/login">Guest</Link>
              )}
            </li>
            <li>
              <Link to={`/${user?.user_metadata.username}/recipes`}>
                My Recipes
              </Link>
            </li>
            <li>
              <Link to={`/${user?.user_metadata.username}/bookmarks`}>
                Bookmark
              </Link>
            </li>
            <li>
              <span onClick={user ? handleSignOut : handleSignIn}>
                {user ? "Logout" : "Login"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
