import { useLocation, Link } from "react-router-dom";
import { capitalizeFristLetter } from "../utils/functions";

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index) => {
      currentLink += `/${crumb}`;
      return (
        <li key={index} className="crumb text-primary-focus">
          <Link to={currentLink} className="link link-hover">
            {capitalizeFristLetter(crumb)}
          </Link>
        </li>
      );
    });

  return (
    <div className="breadcrumbs">
      <ul>{crumbs}</ul>
    </div>
  );
}
