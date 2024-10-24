import { useSearchParams } from "react-router-dom";
import CabinRow from "./CabinRow";
import { Table, Spinner, Empty } from "../../components/common";
import { Menus } from "../../components/Layout";
import { useCabins } from "./useCabins";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins || !cabins.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "start-data-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins =
    filteredCabins?.sort(
      (a: any, b: any) => (a[field] - b[field]) * modifier
    ) || [];

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 1.4fr 1fr 1fr 1fr">
        <Table.Header>
          <div>ID</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
