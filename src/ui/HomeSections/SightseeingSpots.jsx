import styled from "styled-components";
import titleBackground from "../../../public/bg-lead-title.jpg";

const TextLayer = styled.div`
  display: flex;
  align-items: center;
  width: 760px;
  font-weight: bold;
  margin: 4rem;

  h1 {
    width: 50%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: url(${titleBackground});
  }
`;

function SightseeingSpots() {
  return <TextLayer></TextLayer>;
}

export default SightseeingSpots;
