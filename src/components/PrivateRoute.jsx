import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  console.log(user);

  return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
