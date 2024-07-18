import styled from "styled-components";
import { forwardRef } from "react";

const TextLayer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin: 60px 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GoogleMap = styled.iframe`
  width: 600px;
  max-width: 100%;
  height: 450px;
  border: 0;
`;

const TrafficSection = forwardRef((props, ref) => {
  return (
    <TextLayer ref={ref}>
      <h1>交通指南</h1>
      <GoogleMap
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.4543980147737!2d140.9791532760189!3d40.57572437141449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f9b15241784510f%3A0x6958fecded1ea4ce!2z5pif6YeO6ZuG5ZyYIOWlp-WFpeeAqOa6qua1gemFkuW6lw!5e0!3m2!1szh-TW!2stw!4v1721199577090!5m2!1szh-TW!2stw"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </TextLayer>
  );
});

TrafficSection.displayName = "TrafficSection";
export default TrafficSection;
