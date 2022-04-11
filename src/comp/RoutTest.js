import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <div className='RoutTest'>
      <Link to={"/"}>Home</Link>
      <Link to={"/diary"}>Diary</Link>
      <Link to={"/edit"}>Edit</Link>
      <Link to={"/new"}>New</Link>
    </div>
  );
};

export default RouteTest;
