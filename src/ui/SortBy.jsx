import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options, value }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // Setting default value
  const sortBy = searchParams.get("sortBy") || "";
  // This function gets the target value from url
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select value={sortBy} options={options} onChange={handleChange} />;
}

export default SortBy;
