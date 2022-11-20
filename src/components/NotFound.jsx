import notFoundSVG from "../img/not-found.svg";

const NotFound = () => {
  return (
    <div className="not_found">
      <img src={notFoundSVG} alt="" />
      <p>No results found.</p>
    </div>
  );
};

export default NotFound;
