import styled from "styled-components";
import { useDarkMode } from "../../hooks";
import DarkLogo from "../../assets/logo-dark.svg";
import LightLogo from "../../assets/logo-light.svg";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: ${(props) => props.height};
  width: auto;
`;

interface LogoProps {
  height: string;
}

function Logo({ height }: LogoProps) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? DarkLogo : LightLogo;

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" height={height} />
    </StyledLogo>
  );
}

export default Logo;
