import DashboardLayout from "../../features/dashboard/DashboardLayout";
import DashboardFilter from "../../features/dashboard/DashboardFilter";
import { Row, Heading } from "../../components/common";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
