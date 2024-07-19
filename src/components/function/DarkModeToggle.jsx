import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { ButtonIcon } from "../common";
import { useDarkMode } from "../../context/DarkModeContext";

// 唯一在本地端使用Global State的元件，其他的狀態皆用React-Query管理
function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
