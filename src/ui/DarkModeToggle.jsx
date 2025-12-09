import { HiOutlineMoon } from "react-icons/hi2";
import Button from "./Button";
import { useDarkMode } from "../contexts/DarkModalContext";
import { HiOutlineSun } from "react-icons/hi";

function DarkModeToggle() {
  // here, im using custom hook
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <Button onClick={toggleDarkMode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </Button>
  );
}

export default DarkModeToggle;
