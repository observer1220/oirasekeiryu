import styled from "styled-components";
import { forwardRef } from "react";

const TextLayer = styled.div`
  display: grid;
  align-items: center;
  font-weight: bold;
  margin: 4rem;
`;

const TrafficSection = forwardRef((props, ref) => {
  return (
    <TextLayer ref={ref}>
      <h1>交通指南</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        ultricies, nunc id ultricies ultricies, justo odio ultricies libero, ac
        tincidunt enim ligula ut eros. Nullam nec lacus consectetur, ultricies
        purus ac, tincidunt libero. Nulla facilisi. Sed auctor, mi vel tincidunt
        luctus, mi sapien ultricies nunc, nec fermentum nisi dolor nec turpis.
        Nullam nec lacus consectetur, ultricies purus ac, tincidunt libero.
        Nulla facilisi. Sed auctor, mi vel tincidunt luctus, mi sapien ultricies
        nunc, nec fermentum nisi dolor nec turpis.
      </p>
    </TextLayer>
  );
});

TrafficSection.displayName = 'TrafficSection';
export default TrafficSection;
