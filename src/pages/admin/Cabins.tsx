import { Row, Heading } from "../../components/common";
import CabinTable from "../../features/cabins/CabinTable";
import AddCabins from "../../features/cabins/AddCabins";
import CabinTableOperations from "../../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row type="vertical">
        <CabinTable />
        <AddCabins />
      </Row>
    </>
  );
}

export default Cabins;
