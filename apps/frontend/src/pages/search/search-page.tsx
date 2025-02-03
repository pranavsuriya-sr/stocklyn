import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const lol = location.state;
  console.log(lol);

  return <div className="h-screen pt-28">SearchPage</div>;
};

export default SearchPage;
