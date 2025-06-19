import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <div>Not Found</div>
      <Link className="text-blue-500 hover:underline" to={"/"}>
        Go Back To Home
      </Link>
    </>
  );
};

export default NotFound;
