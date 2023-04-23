import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";

const PrivateRecipeRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  const { username } = useParams();
  const recipe = useLoaderData();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (username !== user.user_metadata.username) {
    return <Navigate to="/" />;
  }

  if (recipe && recipe.user_id !== user.id) {
    return <Navigate to="/" />;
  }

  console.log(user);

  return <Component {...rest} />;
};

export default PrivateRecipeRoute;
