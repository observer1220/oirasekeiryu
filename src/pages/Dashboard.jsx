import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("home.title")}</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
