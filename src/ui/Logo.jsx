import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import PropTypes from "prop-types";

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
  const src = isDarkMode ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" height={height} />
    </StyledLogo>
  );
}

export default Logo;
