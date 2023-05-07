import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | SpiceBox</title>
      </Helmet>
      <div className="flex w-full h-screen bg-base-100">
        <div className="m-auto text-center">
          <h1 className="text-8xl font-bold text-secondary-focus">404</h1>
          <p className="text-2xl text-center text-secondary-focus">
            Page not found!
          </p>
          <Link to="/" className="btn btn-secondary mt-3 rounded-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
