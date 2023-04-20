import Container from "../../../components/layouts/Container";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import { useEffect } from "react";

export default function UserRecipes() {
  const { username } = useParams();
  const { user } = useAuth();
  console.log(username);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.user_metadata.username !== username) {
      navigate(`/${user.user_metadata.username}/recipes`, { replace: true });
    }
  }, [user, username, navigate]);

  return (
    <>
      {username !== user.user_metadata.username && (
        <Navigate to={`/${user.user_metadata.usernamee}/recipes`} replace />
      )}
      <Container>
        <h1>Your Recipes</h1>
      </Container>
    </>
  );
}
