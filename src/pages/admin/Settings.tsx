import { Row, Heading } from "../../components/common";
import UpdateSettingsForm from "../../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row type="vertical">
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
