import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import PropTypes from "prop-types";
import DarkLogo from "../../assets/logo-dark.svg";
import LightLogo from "../../assets/logo-light.svg";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: ${(props) => props.height};
  width: auto;
`;
Logo.propTypes = {
  height: PropTypes.string,
};

function Logo({ height }) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? DarkLogo : LightLogo;

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" height={height} />
    </StyledLogo>
  );
}

export default Logo;
