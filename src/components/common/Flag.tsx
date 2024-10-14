import styled from "styled-components";

const FlagImage = styled.img`
  max-width: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

interface FlagProps {
  src: string;
  alt: string;
}

function Flag({ src, alt }: FlagProps) {
  return <FlagImage src={src} alt={alt} />;
}

export default Flag;
