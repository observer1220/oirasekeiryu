import { useSearchParams } from "react-router-dom";
import { Select } from ".";

interface SortByProps {
  options: { label: string; value: string }[];
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const SortBy = searchParams.get("sortBy") || "";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setSearchParams({ ...searchParams, sortBy: value });
  }
  return <Select options={options} value={SortBy} onChange={handleChange} />;
}

export default SortBy;
