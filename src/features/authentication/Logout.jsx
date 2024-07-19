import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ButtonIcon, SpinnerMini } from "../../components/common";
import { useLogout } from "./useAuthentication";

function Logout() {
  const { isLoading, logout } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
