import { useSearchParams } from "react-router-dom";
import { Select } from ".";
import propTypes from "prop-types";

SortBy.propTypes = {
  options: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      value: propTypes.string,
    })
  ).isRequired,
};

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const SortBy = searchParams.get("sortBy") || "";

  function handleChange(event) {
    const value = event.target.value;
    setSearchParams({ ...searchParams, sortBy: value });
  }
  return (
    <Select
      options={options}
      type="white"
      value={SortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
