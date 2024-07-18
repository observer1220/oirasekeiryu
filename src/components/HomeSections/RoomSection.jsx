import styled from "styled-components";
import { useCabins } from "../../features/cabins/useCabins";
import Spinner from "../common/Spinner";
import { forwardRef } from "react";

const TextLayer = styled.div`
  display: grid;
  align-items: center;
  font-weight: bold;
  margin: 4rem;
`;

const CabinInfo = styled.div`
  margin: 1rem 0;
  img {
    width: 100%;
    max-width: 600px;
    object-fit: contain;
  }

  h3 {
    margin: 0.5em 0;
  }

  p {
    font-size: 14px;
  }
`;

const RoomSection = forwardRef((props, ref) => {
  const { isLoading, cabins } = useCabins();

  return (
    <TextLayer ref={ref}>
      <h1>客房介紹</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        cabins.map((cabin) => (
          <CabinInfo key={cabin.id}>
            <img src={cabin.image} alt={cabin.name} />
            <h3>{cabin.name}</h3>
            <p>
              容納人數：
              {cabin.maxCapacity === 1 ? "1位" : `1-${cabin.maxCapacity}位`}
            </p>
            <p>{cabin.description}</p>
            {/* 更多資訊 */}
            {/* <span>${cabin.discount}</span> */}
          </CabinInfo>
        ))
      )}
    </TextLayer>
  );
});

RoomSection.displayName = "RoomSection";
export default RoomSection;
