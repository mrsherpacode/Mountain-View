import styled from "styled-components";
import { useDarkMode } from "../contexts/DarkModalContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  // Here, i'm using custom hook
  const { darkMode } = useDarkMode();

  const src = darkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
