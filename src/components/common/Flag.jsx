import styled from "styled-components";
import PropTypes from "prop-types";

const FlagImage = styled.img`
  max-width: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

Flag.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

function Flag({ src, alt }) {
  return <FlagImage src={src} alt={alt} />;
}

export default Flag;
